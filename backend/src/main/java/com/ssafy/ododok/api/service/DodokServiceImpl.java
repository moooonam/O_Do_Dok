package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.*;
import com.ssafy.ododok.db.model.*;
import com.ssafy.ododok.db.repository.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static com.ssafy.ododok.db.model.Role.ADMIN;
import static com.ssafy.ododok.db.model.Role.MANAGER;
import static java.time.LocalDate.now;

@Service
public class DodokServiceImpl implements DodokService {
    private final DodokRepository dodokRepository;
    private final ReviewPageRepository reviewPageRepository;
    private final ReviewEndRepository reviewEndRepository;
    private final TeamUserRepository teamUserRepository;
    private final BookRepository bookRepository;

    public DodokServiceImpl(DodokRepository dodokRepository,
                            ReviewPageRepository reviewPageRepository,
                            ReviewEndRepository reviewEndRepository,
                            TeamUserRepository teamUserRepository,
                            BookRepository bookRepository){
        this.dodokRepository=dodokRepository;
        this.reviewEndRepository=reviewEndRepository;
        this.reviewPageRepository =reviewPageRepository;
        this.teamUserRepository=teamUserRepository;
        this.bookRepository=bookRepository;
    };

    // 도독 생성
    @Override
    public String startDodok(User user, DodokCreateReq dodokCreateReq) {

        String bookTitle= dodokCreateReq.getBookTitle();
        String bookAuthor = dodokCreateReq.getAuthor();
        String bookGenre = dodokCreateReq.getGenre();
        int bookPage = dodokCreateReq.getPage();

        Book book;

        try{
            book = bookRepository.findByBookTitleAndBookAuthorAndBookPagecnt(bookTitle,bookAuthor,bookPage).get();
        } catch(NoSuchElementException e) { // 책이 없다면 책 테이블에 책을 새로 넣어주어야 함
            Book newBook = Book.builder()
                    .bookTitle(bookTitle)
                    .bookPagecnt(bookPage)
                    .bookGenre(bookGenre)
                    .bookAuthor(bookAuthor)
                    .verification(false)
                    .build();
            bookRepository.save(newBook);
            book = bookRepository.findByBookTitleAndBookAuthorAndBookPagecnt(bookTitle,bookAuthor,bookPage).get();
        }
        
        // 사용자의 권한을 확인 후, 도독 생성
        try{
            TeamUser teamUser = teamUserRepository.findByUser(user);
            if(teamUser.getRole().equals(ADMIN) || teamUser.getRole().equals(MANAGER)){
                Team team =teamUser.getTeam();

                Dodok dodok = Dodok.builder()
                        .dodokStartdate(LocalDate.now())
                        .dodokEnddate(dodokCreateReq.getEndDate())
                        .team(team)
                        .book(book)
                        .build();

                dodokRepository.save(dodok);
                return "도독을 생성하였습니다.";
            } else{
                return "도독을 생성할 권한이 없습니다.";
            }
        } catch (Exception e){
            return "도독을 생성하는데 문제가 생겼습니다.";
        }

    }

    @Override
    public List<Dodok> showLastAllDodoks(User user) {
//        List<Dodok> lastDodokList = new ArrayList<>();
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        List<Dodok>lastDodokList = dodokRepository.findAllByTeamAndDodokComplete(team,true)
                .orElseThrow(()-> new NoSuchElementException());
        return lastDodokList;
    }
    @Override
    public List<ReviewPage> getReviewPageList(Dodok dodok) {
        List<ReviewPage> reviewPageList = reviewPageRepository.findAllByDodok(dodok);
        return reviewPageList;
    }

    @Override
    public List<ReviewPage> getCurReviewPageList(User user) {
        TeamUser teamUser= teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        Optional<List<Dodok>>list = dodokRepository.findAllByTeamAndDodokComplete(team,false);
        if(list.isPresent()){
            Dodok dodok = list.get().get(0);
            List<ReviewPage> reviewPageList= reviewPageRepository.findAllByDodok(dodok);
            return reviewPageList;
        }else{
            return null;
        }
    }

    @Override
    public List<ReviewEnd> getRivewEndList(Dodok dodok) {
        List<ReviewEnd> reviewEndList = reviewEndRepository.findAllByDodok(dodok);
        return reviewEndList;
    }


    @Transactional
    @Override
    public void deleteDodok(Authentication authentication,Long dodokId) {
        Dodok dodok = dodokRepository.findById(dodokId).get();

        List<ReviewPage> pageReviewList =reviewPageRepository.findAllByDodok(dodok);
        for(ReviewPage reviewPage: pageReviewList){
            User user = reviewPage.getUser();
            user.setUserReviewcnt(user.getUserReviewcnt()-1);
        }
        List<ReviewEnd> endReviewList =reviewEndRepository.findAllByDodok(dodok);
        for(ReviewEnd reviewEnd : endReviewList){
            User user = reviewEnd.getUser();
            user.setUserReviewcnt(user.getUserReviewcnt()-1);
        }

        reviewPageRepository.deleteAllByDodok(dodok);
        reviewEndRepository.deleteAllByDodok(dodok);
         //도독 삭제 추가해야함.
        return;
    }
    //하루마다 실행되는 메서드 , 매일 오후 18시에 실행
    @Scheduled(cron = "0 0 18 * * *")
    @Override
    public void timeEndDodok() {
        List<Dodok> dodokList = dodokRepository.findAll();
        for(Dodok dodok: dodokList){
            LocalDate curr = now();
            LocalDate expiredDate = dodok.getDodokEnddate();
            if(expiredDate.isEqual(curr)||expiredDate.isBefore(curr)){
                dodok.setDodokComplete(true);
            }
        }
    }

    @Override
    public int endDodok(Long dodokId){
     Dodok dodok = dodokRepository.findById(dodokId).get();
     Boolean isEnd =dodok.getDodokCompledte();
     if(isEnd){
         return 0;
     }else{
         dodok.setDodokComplete(true);
         return 1;
     }
    }

    @Override
    public void writePageReview(PageReviewCreatePostReq pageReviewCreatePostReq, User user) {
        Dodok dodok = dodokRepository.findById(pageReviewCreatePostReq.getDodokId()).get();
        ReviewPage reviewPage = ReviewPage.builder()
                .reviewPagePage(pageReviewCreatePostReq.getPage())
                .reviewPageContent(pageReviewCreatePostReq.getContent())
                .reviewPageDate(now())
                .user(user)
                .dodok(dodok)
                .build();

        reviewPageRepository.save(reviewPage);
    }
    @Override
    public boolean modifyPageReview(PageReviewPutReq pageReviewPutReq, User user) {
        ReviewPage reviewPage= reviewPageRepository.findById(pageReviewPutReq.getPageReviewId()).get();
        if(reviewPage.getUser()==user){
            reviewPage.setReviewPageContent(pageReviewPutReq.getContent());
            return true;
        }else{
            return false;
        }
    }

    @Transactional
    @Override
    public boolean deletePageReview(Long pageReviewId, User user) {
        ReviewPage reviewPage= reviewPageRepository.findById(pageReviewId).get();
        if(reviewPage.getUser()==user){
            reviewPageRepository.deleteById(pageReviewId);
            user.setUserReviewcnt(user.getUserReviewcnt()-1);
            return true;
        }else{
            return false;
        }
    }

    @Override
    public void writeEndReview(EndReviewCreatePostReq endReviewCreatePostReq, User user) {
        Dodok dodok = dodokRepository.findById(endReviewCreatePostReq.getDodokId()).get();
        ReviewEnd reviewEnd = ReviewEnd.builder()
                .user(user)
                .dodok(dodok)
                .reviewEndContent(endReviewCreatePostReq.getContent())
                .reviewEndDate(now())
                .reviewEndBookrating(endReviewCreatePostReq.getBookRating())
                .reviewEndGenrerating(endReviewCreatePostReq.getGenreRating())
        .build();

        reviewEndRepository.save(reviewEnd);
    }

    @Override
    public boolean modifyEndReview(EndReviewModifyPutReq endReviewModifyPutReq, User user) {
        ReviewEnd reviewEnd = reviewEndRepository.findById(endReviewModifyPutReq.getEndReviewId()).get();
        if(user == reviewEnd.getUser()){
            reviewEnd.updateReview(endReviewModifyPutReq);

            //update 쿼리 나가는지 확인해야함.
            return true;
        }else{
            return false;
        }
    }

    @Override
    public boolean deleteEndReview(Long endReviewId, User user) {
        ReviewEnd reviewEnd = reviewEndRepository.findById(endReviewId).get();
        if(reviewEnd.getUser()== user){
            reviewEndRepository.deleteById(endReviewId);
            return true;
        }else{
            return false;
        }
    }

    @Override
    public List<ReviewEnd> getRivewEndList(Long dodokId) {
        Dodok dodok = dodokRepository.findById(dodokId).get();
        List<ReviewEnd> reviewEndList = reviewEndRepository.findAllByDodok(dodok);

        return reviewEndList;
    }
}
