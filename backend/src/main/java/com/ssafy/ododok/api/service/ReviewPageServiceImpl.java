package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.PageReviewCreatePostReq;
import com.ssafy.ododok.api.request.PageReviewPutReq;
import com.ssafy.ododok.db.model.*;
import com.ssafy.ododok.db.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.time.LocalDate.now;

@Service
public class ReviewPageServiceImpl implements ReviewPageService{

    private final UserRepository userRepository;
    private final DodokRepository dodokRepository;
    private final ReviewPageRepository reviewPageRepository;
    private final TeamUserRepository teamUserRepository;

    public ReviewPageServiceImpl(UserRepository userRepository,
                            DodokRepository dodokRepository,
                            ReviewPageRepository reviewPageRepository,
                            TeamUserRepository teamUserRepository){
        this.userRepository = userRepository;
        this.dodokRepository=dodokRepository;
        this.reviewPageRepository =reviewPageRepository;
        this.teamUserRepository=teamUserRepository;
    };

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

    // 회원에 따른 페이지 리뷰 리스트
    @Override
    public List<ReviewPage> getReviewPageList(User user){
        List<ReviewPage> reviewPageList= reviewPageRepository.findAllByUser(user);
        return reviewPageList;
    }
}
