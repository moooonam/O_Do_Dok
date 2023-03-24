package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.EndReviewCreatePostReq;
import com.ssafy.ododok.api.request.EndReviewModifyPutReq;
import com.ssafy.ododok.api.service.ReviewEndService;
import com.ssafy.ododok.common.auth.PrincipalDetails;
import com.ssafy.ododok.db.model.ReviewEnd;
import com.ssafy.ododok.db.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/dodok/endReview")
public class ReviewEndController {

    private final ReviewEndService reviewEndService;

    @Autowired
    ReviewEndController(ReviewEndService reviewEndService){
        this.reviewEndService = reviewEndService;
    }

    // 총 리뷰 입력 _ 현재 진행 중인 도독
    @PostMapping("/add")
    public ResponseEntity<String> writeEndReview(@RequestBody EndReviewCreatePostReq endReviewCreatePostReq, Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        String res = reviewEndService.writeEndReview(endReviewCreatePostReq, user);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // 총 리뷰 수정 _ 현재 진행 중인 도독
    @PutMapping("/update")
    public ResponseEntity<String> modifyEndReviews(@RequestBody EndReviewModifyPutReq endReviewModifyPutReq, Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        boolean result =reviewEndService.modifyEndReview(endReviewModifyPutReq, user);
        if(result){
            return new ResponseEntity<>("수정이 완료됐습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("권한이 없어 수정에 실패했습니다.",HttpStatus.OK);
        }
    }

    // 총 리뷰 삭제
    @DeleteMapping("/{endReviewId}")
    public ResponseEntity<String> deleteEndReviews(@PathVariable Long endReviewId
            ,Authentication authentication) throws Exception {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        boolean result =reviewEndService.deleteEndReview(endReviewId, user);
        if(result){
            return new ResponseEntity<>("삭제가 완료됐습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("권한이 없어 삭제에 실패했습니다.",HttpStatus.OK);
        }
    }

    // 총 리뷰 조회 _ 상세보기
    @GetMapping("/detail/{endReviewId}")
    public ResponseEntity<?> showEndReviews(@PathVariable Long endReviewId, Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        ReviewEnd reviewEnd = reviewEndService.getEndReview(endReviewId, user);

        if(reviewEnd==null){
            return new ResponseEntity("볼 수 있는 권한이 없습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity(reviewEnd, HttpStatus.OK);
        }
    }

    //총평 조회 _ 사용자 기준 현재 진행 중인 도독 기준 총평 총 목록
    @GetMapping("/list")
    public ResponseEntity<?> listCurEndReviews(Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();

        List<ReviewEnd> reviewEndList=reviewEndService.getCurRivewEndList(user);

        if(reviewEndList==null){
            return new ResponseEntity("진행 중인 도독이 없거나, 현재 작성된 리뷰가 없습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity(reviewEndList,HttpStatus.OK);
        }
    }
}
