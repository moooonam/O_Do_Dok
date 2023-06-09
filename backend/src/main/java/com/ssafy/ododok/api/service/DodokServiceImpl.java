package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.*;
import com.ssafy.ododok.api.response.ReviewEndRes;
import com.ssafy.ododok.api.response.ReviewPageRes;
import com.ssafy.ododok.db.model.*;
import com.ssafy.ododok.db.repository.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

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
    private final GenreRepository genreRepository;

    public DodokServiceImpl(UserRepository userRepository,
                            DodokRepository dodokRepository,
                            ReviewPageRepository reviewPageRepository,
                            ReviewEndRepository reviewEndRepository,
                            TeamRepository teamRepository,
                            TeamUserRepository teamUserRepository,
                            BookRepository bookRepository, GenreRepository genreRepository){
        this.userRepository = userRepository;
        this.dodokRepository=dodokRepository;
        this.reviewEndRepository=reviewEndRepository;
        this.reviewPageRepository =reviewPageRepository;
        this.teamRepository = teamRepository;
        this.teamUserRepository=teamUserRepository;
        this.bookRepository=bookRepository;
        this.genreRepository = genreRepository;
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
                team.changeIsOngoingDodok(true);
                teamRepository.save(team);
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
                dodok.changeComplete(true);
                dodokRepository.save(dodok);
                // 해당 도독의 팀 아이디를 가져오기, 해당 팀의 도독 활성화 여부를 false처리.
                Team team = dodok.getTeam();
                team.changeIsOngoingDodok(false);

                List<TeamUser> teamUserlist = teamUserRepository.findTeamUsersByTeam_TeamId(team.getTeamId());
                for(TeamUser teamUser : teamUserlist){
                    teamUser.getUser().changeUserDodokcnt(teamUser.getUser().getUserDodokcnt()+1);
                    userRepository.save(teamUser.getUser());
                }

                updateGenre(dodok);
                String top = showFirst(team);
                if(top != null){
                    team.changeTeamTopGenre(top);
                }
                teamRepository.save(team);
            }
        }
    }

    // 도독 종료시키기
    // 도독을 종료시킬 때 작성한 총평이 없어도 종료가 되게끔 만들어야 함.
    @Override
    public int endDodok(Long dodokId) throws Exception {
        Dodok dodok = dodokRepository.findById(dodokId).get();
        Boolean isEnd = dodok.isDodokComplete();
        if(isEnd){ // 이미 도독이 완료되었다면
            return 0;
        }else{
            dodok.changeComplete(true);
            dodokRepository.save(dodok);

            Team team = dodok.getTeam();
            team.changeIsOngoingDodok(false);

            List<TeamUser> teamUserlist = teamUserRepository.findTeamUsersByTeam_TeamId(team.getTeamId());
            for(TeamUser teamUser : teamUserlist){
                teamUser.getUser().changeUserDodokcnt(teamUser.getUser().getUserDodokcnt()+1);
                userRepository.save(teamUser.getUser());
            }

            updateGenre(dodok);
            String top = showFirst(team);
            System.out.println("dd"+top);
            if(top != null){
                team.changeTeamTopGenre(top);
            }

            teamRepository.save(team);
            return 1;
        }
    }

    // 도독 삭제하기
    @Transactional
    @Override
    public void deleteDodok(Authentication authentication, Long dodokId) throws Exception {
        Dodok dodok = dodokRepository.findById(dodokId).get();
        Team team = dodok.getTeam();

        // 페이지별 리뷰, 총평 삭제
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
            team.changeIsOngoingDodok(false);
            teamRepository.save(team);
        }
        //도독 삭제 추가해야함.
        dodokRepository.delete(dodok);
    }

    // 지난 도독 조회하기 _ 팀별
    @Override
    public List<Dodok> showLastTeamAllDodoks(User user, Long teamId) {
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

    // 지난 도독 조회하기 _ 모든 공개된 도독
    @Override
    public List<Dodok> showLastAllDodoks() {
        List<Dodok>lastDodokList = dodokRepository.findAllByDodokCompleteAndDodokOpen(true, true)
                .orElseThrow(()-> new NoSuchElementException());
        return lastDodokList;
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

    @Override
    public List<ReviewPageRes> getReviewPageList2(Dodok dodok) {
        List<ReviewPage> reviewPageList = reviewPageRepository.findAllByDodok(dodok);
        List<ReviewPageRes> res = new ArrayList<>();
        for(ReviewPage reviewPage:reviewPageList){
            ReviewPageRes reviewPageRes = ReviewPageRes.builder()
                    .reviewPageId(reviewPage.getReviewPageId())
                    .user(reviewPage.getUser())
                    .reviewPagePage(reviewPage.getReviewPagePage())
                    .reviewPageContent(reviewPage.getReviewPageContent())
                    .reviewPageDate(reviewPage.getReviewPageDate())
                    .build();
            res.add(reviewPageRes);
        }
        return res;
    }

    @Override
    public List<ReviewEndRes> getRivewEndList2(Dodok dodok) {
        List<ReviewEnd> reviewEndList = reviewEndRepository.findAllByDodok(dodok);
        List<ReviewEndRes> res = new ArrayList<>();
        for(ReviewEnd reviewEnd:reviewEndList){
            ReviewEndRes reviewEndRes = ReviewEndRes.builder()
                    .reviewEndId(reviewEnd.getReviewEndId())
                    .user(reviewEnd.getUser())
                    .reviewEndContent(reviewEnd.getReviewEndContent())
                    .reviewEndDate(reviewEnd.getReviewEndDate())
                    .reviewEndGenrerating(reviewEnd.getReviewEndGenrerating())
                    .reviewEndBookrating(reviewEnd.getReviewEndBookrating())
                    .build();

            res.add(reviewEndRes);
        }
        return res;
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

    @Override
    public Dodok nowDodok(User user) {
        try{
            TeamUser teamUser = teamUserRepository.findByUser(user);
            Team team = teamUser.getTeam();
            Dodok dodok = dodokRepository.findByTeamAndDodokComplete(team, false).get();
            return dodok;
        } catch (Exception e){
            return null;
        }

    }

    @Override
    public Dodok detailDodok(Long dodokId) {
        Dodok dodok = dodokRepository.findById(dodokId).get();
        return dodok;
    }

    // 도독이 종료되었을 때 장르 평점 추가하기
    public void updateGenre(Dodok dodok){


        List<ReviewEnd> list = reviewEndRepository.findAllByDodok(dodok);

        if(list.size()==0){
            return;
        }
        Double ans = 0.0;
        for(ReviewEnd reviewEnd : list){
            ans = ans + reviewEnd.getReviewEndGenrerating();
        }
        Double res = ans/list.size();
        String genre = dodok.getBook().getBookGenre();
        System.out.println(genre);

        try{
            Genre genre1 = genreRepository.findByTeamAndGenre(dodok.getTeam(), genre);
            System.out.println(genre1);
            Double d = genre1.getRating();
            int cnt = genre1.getCnt();
            genre1.changeRating((d+res)/(double)(cnt+1));
            genre1.changeCnt(cnt+1);
            genreRepository.save(genre1);

        } catch (NullPointerException e){
            Genre genre1 = Genre.builder()
                    .team(dodok.getTeam())
                    .genre(genre)
                    .rating(res)
                    .cnt(1)
                    .build();
            genreRepository.save(genre1);
        }

    }

    public String showFirst(Team team){
        try{
            Genre genre = genreRepository.findTopByTeamOrderByRatingDesc(team);
            System.out.println(genre.getGenre()+" "+genre.getRating());
            // Team 인 것 중에서 rating이 max인거
            String res = genre.getGenre();
            return res;
        } catch (Exception e){
            return null;
        }

    }
}
