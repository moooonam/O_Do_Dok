package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.PageReviewCreatePostReq;
import com.ssafy.ododok.api.request.PageReviewPutReq;
import com.ssafy.ododok.api.response.ReviewPageRes;
import com.ssafy.ododok.api.service.ReviewPageService;
import com.ssafy.ododok.common.auth.PrincipalDetails;
import com.ssafy.ododok.db.model.ReviewPage;
import com.ssafy.ododok.db.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/dodok/pageReview")
public class ReviewPageController {

    private final ReviewPageService reviewPageService;

    @Autowired
    ReviewPageController(ReviewPageService reviewPageService){
        this.reviewPageService = reviewPageService;
    }

    //책갈피 입력 _ 현재 진행 중인 도독
    @PostMapping("/add")
    public ResponseEntity<String> writePageReview(@RequestBody PageReviewCreatePostReq pageReviewCreatePostReq, Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        String res = reviewPageService.writePageReview(pageReviewCreatePostReq,user);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    //책갈피 수정 _ 현재 진행 중인 도독
    @PutMapping("/update")
    public ResponseEntity<String> modifyPageReviews(@RequestBody PageReviewPutReq pageReviewPutReq, Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        boolean result =reviewPageService.modifyPageReview(pageReviewPutReq, user);
        if(result){
            return new ResponseEntity<>("수정이 완료됐습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("권한이 없어 수정에 실패했습니다.",HttpStatus.OK);
        }
    }

    //책갈피 삭제
    @DeleteMapping("/{pageReviewId}")
    public ResponseEntity<String> deletePageReviews(@PathVariable Long pageReviewId
            ,Authentication authentication) throws Exception {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        boolean result =reviewPageService.deletePageReview(pageReviewId,user);
        if(result){
            return new ResponseEntity<>("삭제가 완료됐습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("권한이 없어 삭제에 실패했습니다.",HttpStatus.OK);
        }
    }

    //책갈피 조회 _ 상세보기
    @GetMapping("/detail/{pageReviewId}")
    public ResponseEntity<?> showPageReviews(@PathVariable Long pageReviewId, Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        ReviewPageRes reviewPage = reviewPageService.getReviewPage(pageReviewId);
        return new ResponseEntity(reviewPage, HttpStatus.OK);
    }

    //책갈피 조회 _ 사용자 기준 현재 진행 중인 도독 기준 책갈피 총 목록
    @GetMapping("/list")
    public ResponseEntity<?> listCurPageReviews(Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();

        List<ReviewPage> reviewPageList=reviewPageService.getCurReviewPageList(user);

        if(reviewPageList==null){
            return new ResponseEntity("진행 중인 도독이 없거나, 현재 작성된 리뷰가 없습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity(reviewPageList,HttpStatus.OK);
        }
    }

}
