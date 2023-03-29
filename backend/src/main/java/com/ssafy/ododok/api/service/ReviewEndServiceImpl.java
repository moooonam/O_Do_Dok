package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.EndReviewCreatePostReq;
import com.ssafy.ododok.api.request.EndReviewModifyPutReq;
import com.ssafy.ododok.db.model.*;
import com.ssafy.ododok.db.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static java.time.LocalDate.now;

@Service
public class ReviewEndServiceImpl implements ReviewEndService {

    private final UserRepository userRepository;
    private final DodokRepository dodokRepository;
    private final ReviewEndRepository reviewEndRepository;
    private final TeamUserRepository teamUserRepository;
    private final BookRepository bookRepository;
    private final GenreRepository genreRepository;

    public ReviewEndServiceImpl(UserRepository userRepository,
                                DodokRepository dodokRepository,
                                ReviewEndRepository reviewEndRepository,
                                TeamUserRepository teamUserRepository,
                                BookRepository bookRepository,
                                GenreRepository genreRepository){
        this.userRepository = userRepository;
        this.dodokRepository=dodokRepository;
        this.reviewEndRepository=reviewEndRepository;
        this.teamUserRepository=teamUserRepository;
        this.bookRepository=bookRepository;
        this.genreRepository = genreRepository;
    };

    // 총 리뷰 작성
    @Override
    public String writeEndReview(EndReviewCreatePostReq endReviewCreatePostReq, User user) {

        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        Dodok dodok = dodokRepository.findByTeamAndDodokComplete(team, false).get();

        ReviewEnd reviewEnd = reviewEndRepository.findByUserAndDodok(user, dodok);
        if(reviewEnd == null){
            try{
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
                userRepository.save(user);

                Book book = dodok.getBook();
                int memberCnt = book.getBookMembercnt();
                double rating = book.getBookRating();
                double rating_modify = ((double) memberCnt * rating) + endReviewCreatePostReq.getBookRating();

                book.changeBookMembercnt(memberCnt+1);
                book.changeBookRating(rating_modify/(double)(memberCnt+1));
                bookRepository.save(book);

                return "책갈피 입력이 완료되었습니다.";
            } catch (Exception e1){
                System.out.println(e1);
                return "책갈피 입력에 문제가 생겼습니다.";
            }
        } else {
            return "이미 작성하셨습니다.";
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
    @Transactional
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

    @Override
    public List<ReviewEnd> getReviewEndList(User user) {
        List<ReviewEnd> reviewEndList= reviewEndRepository.findAllByUser(user);
        return reviewEndList;
    }

}
