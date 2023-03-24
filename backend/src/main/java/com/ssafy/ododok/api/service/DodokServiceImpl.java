package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.*;
import com.ssafy.ododok.db.model.*;
import com.ssafy.ododok.db.repository.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
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
    public List<Dodok> showLastAllDodoks(User user, Long teamId) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team userteam = teamUser.getTeam(); // 사용자의 팀

        if(userteam.getTeamId() == teamId){
            List<Dodok>lastDodokList = dodokRepository.findAllByTeamAndDodokComplete(userteam,true)
                    .orElseThrow(()-> new NoSuchElementException());
            return lastDodokList;
        } else {    // 해당 팀이 아니라면? 공개만 볼 수 있어야 함.
            Team team = teamRepository.findById(teamId).get();
            List<Dodok>lastDodokList = dodokRepository.findAllByTeamAndDodokCompleteAndDodokOpen(team,true, true)
                    .orElseThrow(()-> new NoSuchElementException());
            return lastDodokList;
        }

    }



    // 도독 기준 페이지별 리뷰 리스트
    @Override
    public List<ReviewPage> getReviewPageList(Dodok dodok) {
        List<ReviewPage> reviewPageList = reviewPageRepository.findAllByDodok(dodok);
        return reviewPageList;
    }




    // 도독 기준 총 리뷰 리스트
    @Override
    public List<ReviewEnd> getRivewEndList(Dodok dodok) {
        List<ReviewEnd> reviewEndList = reviewEndRepository.findAllByDodok(dodok);
        return reviewEndList;
    }

    // 도독을 공개로 설정
    @Override
    public String updateDodokOpen(User user, Long dodokId) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team =teamUser.getTeam();
        Dodok dodok = dodokRepository.findById(dodokId).get();

        if((dodok.getTeam().getTeamId() == team.getTeamId()) && (teamUser.getRole().equals(ADMIN) || teamUser.getRole().equals(MANAGER))){
            dodok.changeDodokOpen(true);
            dodokRepository.save(dodok);
            return "도독이 공개로 설정되었습니다.";
        } else{
            return "권한이 없습니다.";
        }
    }

    // 도독을 비공개로 설정
    @Override
    public String updateDodokClose(User user, Long dodokId) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team =teamUser.getTeam();
        Dodok dodok = dodokRepository.findById(dodokId).get();

        if((dodok.getTeam().getTeamId() == team.getTeamId()) && (teamUser.getRole().equals(ADMIN) || teamUser.getRole().equals(MANAGER))){
            dodok.changeDodokOpen(false);
            dodokRepository.save(dodok);
            return "도독이 비공개로 설정되었습니다.";
        } else{
            return "권한이 없습니다.";
        }
    }

    // 도독 찾기
    @Override
    public List<Dodok> searchDodoks(String keyword) {
        List<Book> searchResult= bookRepository.findAllByBookTitleContainingIgnoreCase(keyword);

        List<Dodok> dodokResult = new ArrayList<>();

        for(Book list : searchResult){
            List<Dodok> dodoklist = dodokRepository.findAllByBook(list).get();
            for(Dodok dodok : dodoklist){
                dodokResult.add(dodok);
            }
        }
        return dodokResult;
    }

}
