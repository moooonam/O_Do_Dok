package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.*;
import com.ssafy.ododok.db.model.*;
import com.ssafy.ododok.db.repository.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static com.ssafy.ododok.db.model.Role.ADMIN;
import static com.ssafy.ododok.db.model.Role.MANAGER;
import static java.time.LocalDate.now;

@Service
public class DodokServiceImpl implements DodokService {

    private final UserRepository userRepository;
    private final DodokRepository dodokRepository;
    private final ReviewPageRepository reviewPageRepository;
    private final ReviewEndRepository reviewEndRepository;
    private final TeamRepository teamRepository;
    private final TeamUserRepository teamUserRepository;
    private final BookRepository bookRepository;

    public DodokServiceImpl(UserRepository userRepository,
                            DodokRepository dodokRepository,
                            ReviewPageRepository reviewPageRepository,
                            ReviewEndRepository reviewEndRepository,
                            TeamRepository teamRepository,
                            TeamUserRepository teamUserRepository,
                            BookRepository bookRepository){
        this.userRepository = userRepository;
        this.dodokRepository=dodokRepository;
        this.reviewEndRepository=reviewEndRepository;
        this.reviewPageRepository =reviewPageRepository;
        this.teamRepository = teamRepository;
        this.teamUserRepository=teamUserRepository;
        this.bookRepository=bookRepository;
    };

    // 도독 생성
    @Override
    public String startDodok(User user, DodokCreateReq dodokCreateReq) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team =teamUser.getTeam();

        if(team.isOngoingDodok() == true){
            return "이미 진행중인 도독이 있습니다.";
        }

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
                    .needCheck(true)
                    .build();
            bookRepository.save(newBook);
            book = bookRepository.findByBookTitleAndBookAuthorAndBookPagecnt(bookTitle,bookAuthor,bookPage).get();
        }
        
        // 사용자의 권한을 확인 후, 도독 생성
        try{
            if(teamUser.getRole().equals(ADMIN) || teamUser.getRole().equals(MANAGER)){

                Dodok dodok = Dodok.builder()
                        .dodokStartdate(LocalDate.now())
                        .dodokEnddate(dodokCreateReq.getEndDate())
                        .team(team)
                        .book(book)
                        .build();

                dodokRepository.save(dodok);
                teamRepository.updateIsOngoingDodok(true, team.getTeamId());
                return "도독을 생성하였습니다.";
            } else{
                return "도독을 생성할 권한이 없습니다.";
            }
        } catch (Exception e){
            return "도독을 생성하는데 문제가 생겼습니다.";
        }

    }

    // 하루마다 실행되는 메서드 , 매일 오후 18시에 실행
    // 도독 마감 날짜에 맞춰 도독 종료시키기 위함
    @Scheduled(cron = "0 0 18 * * *")
    @Override
    public void timeEndDodok() throws Exception {
        List<Dodok> dodokList = dodokRepository.findAll();
        for(Dodok dodok: dodokList){
            LocalDate curr = now();
            LocalDate expiredDate = dodok.getDodokEnddate();
            if(expiredDate.isEqual(curr)||expiredDate.isBefore(curr)){
                dodokRepository.updateDodokComplete(true, dodok.getDodokId());
                // 해당 도독의 팀 아이디를 가져오기, 해당 팀의 도독 활성화 여부를 false처리.
                Team team = dodok.getTeam();
                teamRepository.updateIsOngoingDodok(false, team.getTeamId());
            }
        }
    }

    // 도독 종료시키기
    @Override
    public int endDodok(Long dodokId) throws Exception {
        Dodok dodok = dodokRepository.findById(dodokId).get();
        Boolean isEnd = dodok.isDodokComplete();
        if(isEnd){ // 이미 도독이 완료되었다면
            return 0;
        }else{
            dodokRepository.updateDodokComplete(true, dodokId);
            Team team = dodok.getTeam();
            teamRepository.updateIsOngoingDodok(false, team.getTeamId());
            return 1;
        }
    }

    // 도독 삭제하기
    @Override
    public void deleteDodok(Authentication authentication, Long dodokId) throws Exception {
        Dodok dodok = dodokRepository.findById(dodokId).get();
        Team team = dodok.getTeam();

        List<ReviewPage> pageReviewList =reviewPageRepository.findAllByDodok(dodok);
        for(ReviewPage reviewPage: pageReviewList){
            User user = reviewPage.getUser();
            user.changeReviewcnt(user.getUserReviewcnt()-1);
            userRepository.save(user);
        }

        List<ReviewEnd> endReviewList =reviewEndRepository.findAllByDodok(dodok);
        for(ReviewEnd reviewEnd : endReviewList){
            User user = reviewEnd.getUser();
            user.changeReviewcnt(user.getUserReviewcnt()-1);
            userRepository.save(user);
        }
        reviewPageRepository.deleteAllByDodok(dodok);
        reviewEndRepository.deleteAllByDodok(dodok);
        if(dodok.isDodokComplete()==false){
            teamRepository.updateIsOngoingDodok(false, team.getTeamId());
        }
        //도독 삭제 추가해야함.
        dodokRepository.delete(dodok);
    }

    // 지난 도독 조회하기
    @Override
    public List<Dodok> showLastAllDodoks(User user) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        List<Dodok>lastDodokList = dodokRepository.findAllByTeamAndDodokComplete(team,true)
                .orElseThrow(()-> new NoSuchElementException());
        return lastDodokList;
    }

    // 책갈피 입력하기
    @Override
    public String writePageReview(PageReviewCreatePostReq pageReviewCreatePostReq, User user) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        try{
            Dodok dodok = dodokRepository.findByTeamAndDodokComplete(team, false).get();
            ReviewPage reviewPage = ReviewPage.builder()
                    .reviewPagePage(pageReviewCreatePostReq.getPage())
                    .reviewPageContent(pageReviewCreatePostReq.getContent())
                    .reviewPageDate(now())
                    .user(user)
                    .dodok(dodok)
                    .build();
            reviewPageRepository.save(reviewPage);
            user.changeReviewcnt(user.getUserReviewcnt()+1);
            userRepository.save(user);
            return "책갈피 입력이 완료되었습니다.";
        } catch (Exception e){
            return "책갈피 입력에 문제가 생겼습니다.";
        }

    }

    // 책갈피 수정하기
    @Override
    public boolean modifyPageReview(PageReviewPutReq pageReviewPutReq, User user) {
        ReviewPage reviewPage= reviewPageRepository.findById(pageReviewPutReq.getReviewPageId()).get();
        if(reviewPage.getUser().getUserId()==user.getUserId()){
            reviewPage.changeReviewPageContent(pageReviewPutReq.getContent());
            reviewPageRepository.save(reviewPage);
            return true;
        }else{
            return false;
        }
    }

    // 책갈피 삭제하기
    @Override
    public boolean deletePageReview(Long pageReviewId, User user) throws Exception {
        ReviewPage reviewPage= reviewPageRepository.findById(pageReviewId).get();
        if(reviewPage.getUser().getUserId()==user.getUserId()){
            reviewPageRepository.deleteById(pageReviewId);
            user.changeReviewcnt(user.getUserReviewcnt()-1);
            userRepository.save(user);
            return true;
        }else{
            return false;
        }
    }

    // 책갈피 상세보기 -> 현재는 같은 팀인지만 확인하고 있음. 비공개 공개 넣으면 또 달라져야함.
    @Override
    public ReviewPage getReviewPage(Long pageReviewId, User user) {
        ReviewPage reviewPage = reviewPageRepository.findByReviewPageId(pageReviewId);
        Team team = teamUserRepository.findByUser(user).getTeam();
        if(reviewPage.getDodok().getTeam().getTeamId() == team.getTeamId()){
            return reviewPage;
        } else{
            return null;
        }
    }

    // 해당 도독에 대한 페이지별 리뷰 리스트
    @Override
    public List<ReviewPage> getCurReviewPageList(User user) {
        TeamUser teamUser= teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        if(team.isOngoingDodok() == true){
            Optional<List<Dodok>> list = dodokRepository.findAllByTeamAndDodokComplete(team,false);
            Dodok dodok = list.get().get(0);
            List<ReviewPage> reviewPageList= reviewPageRepository.findAllByDodok(dodok);
            return reviewPageList;
        } else{
            return null;
        }

    }

    // 도독 기준 페이지별 리뷰 리스트
    @Override
    public List<ReviewPage> getReviewPageList(Dodok dodok) {
        List<ReviewPage> reviewPageList = reviewPageRepository.findAllByDodok(dodok);
        return reviewPageList;
    }


    // 총 리뷰 작성
    @Override
    public String writeEndReview(EndReviewCreatePostReq endReviewCreatePostReq, User user) {

        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        ReviewEnd reviewEnd = reviewEndRepository.findByUser(user);
        if(reviewEnd != null){
            return "이미 작성하셨습니다.";
        }

        try{
            Dodok dodok = dodokRepository.findByTeamAndDodokComplete(team, false).get();
            reviewEnd = ReviewEnd.builder()
                    .user(user)
                    .dodok(dodok)
                    .reviewEndContent(endReviewCreatePostReq.getContent())
                    .reviewEndDate(now())
                    .reviewEndBookrating(endReviewCreatePostReq.getBookRating())
                    .reviewEndGenrerating(endReviewCreatePostReq.getGenreRating())
                    .build();

            reviewEndRepository.save(reviewEnd);
            user.changeReviewcnt(user.getUserReviewcnt()+1);
            Book book = dodok.getBook();
            book.changeBookMembercnt(book.getBookMembercnt()-1);
            int membercnt = book.getBookMembercnt();
            double rating = book.getBookRating();
            double rating_modify = ((double) membercnt * rating) + endReviewCreatePostReq.getBookRating();
            int membercnt_modify = book.getBookMembercnt() + 1;
            book.changeBookRating(rating_modify/(double)membercnt_modify);
            userRepository.save(user);
            bookRepository.save(book);
            return "책갈피 입력이 완료되었습니다.";
        } catch (Exception e){
            return "책갈피 입력에 문제가 생겼습니다.";
        }

    }


    // 총 리뷰 수정
    @Override
    public boolean modifyEndReview(EndReviewModifyPutReq endReviewModifyPutReq, User user) {
        ReviewEnd reviewEnd = reviewEndRepository.findByReviewEndId(endReviewModifyPutReq.getEndReviewId());
        if(reviewEnd.getUser().getUserId()==user.getUserId()){
            reviewEnd.changeContent(endReviewModifyPutReq.getContent());
            reviewEndRepository.save(reviewEnd);
            return true;
        }else {
            return false;
        }

    }

    // 총 리뷰 삭제
    @Override
    public boolean deleteEndReview(Long endReviewId, User user) {
        ReviewEnd reviewEnd = reviewEndRepository.findById(endReviewId).get();
        if(reviewEnd.getUser().getUserId()==user.getUserId()){
            reviewEndRepository.deleteById(endReviewId);
            user.changeReviewcnt(user.getUserReviewcnt()-1);
            userRepository.save(user);
            return true;
        }else{
            return false;
        }

    }

    // 총 리뷰 조회 _ 상세보기
    @Override
    public ReviewEnd getEndReview(Long endReviewId, User user) {
        ReviewEnd reviewEnd = reviewEndRepository.findByReviewEndId(endReviewId);
        Team team = teamUserRepository.findByUser(user).getTeam();
        if(reviewEnd.getDodok().getTeam().getTeamId() == team.getTeamId()){
            return reviewEnd;
        } else{
            return null;
        }
    }

    // 해당 도독에 대한 총 리뷰 조회 _ 목록보기
    @Override
    public List<ReviewEnd> getCurRivewEndList(User user) {
        TeamUser teamUser= teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        if(team.isOngoingDodok() == true){
            Optional<List<Dodok>> list = dodokRepository.findAllByTeamAndDodokComplete(team,false);
            Dodok dodok = list.get().get(0);
            List<ReviewEnd> reviewEndList= reviewEndRepository.findAllByDodok(dodok);
            return reviewEndList;
        } else{
            return null;
        }
    }

    // 도독 기준 총 리뷰 리스트
    @Override
    public List<ReviewEnd> getRivewEndList(Dodok dodok) {
        List<ReviewEnd> reviewEndList = reviewEndRepository.findAllByDodok(dodok);
        return reviewEndList;
    }

}
