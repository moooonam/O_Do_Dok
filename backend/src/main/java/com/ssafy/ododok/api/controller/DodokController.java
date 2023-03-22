package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.*;
import com.ssafy.ododok.api.response.DodokInfoRes;
import com.ssafy.ododok.api.service.DodokService;
import com.ssafy.ododok.common.auth.PrincipalDetails;
import com.ssafy.ododok.db.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/dodok")
public class DodokController {

    private final DodokService dodokService;

    @Autowired
    DodokController(DodokService dodokService){
        this.dodokService = dodokService;
    }

    //도독 생성 및 시작
    @PostMapping("/start")
    public ResponseEntity<String> startDodok(@RequestBody DodokCreateReq dodokCreateReq, Authentication auth) {
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        String res = dodokService.startDodok(user, dodokCreateReq);
        return new ResponseEntity(res, HttpStatus.OK);
    }

    //도독 종료
    @PutMapping("/end/{dodokId}")
    public ResponseEntity<String> endDodok(@PathVariable Long dodokId) throws Exception {
        ResponseEntity res = dodokService.endDodok(dodokId)==0 ? new ResponseEntity<>("이미 종료 상태입니다.",HttpStatus.OK)
        : new ResponseEntity<>("진행중인 도독을 종료했습니다.",HttpStatus.OK);
        return res;
    }

    //도독 삭제
    @DeleteMapping("/{dodokId}")
    public ResponseEntity<?> deleteDodok(Authentication authentication,@PathVariable Long dodokId) throws Exception {
        dodokService.deleteDodok(authentication,dodokId);
        return new ResponseEntity<>("도독이 삭제됐습니다.",HttpStatus.OK);
    }

    // 지난 도독 리스트 가져오기
    @GetMapping("/lastdodoks")
    public ResponseEntity<List<DodokInfoRes>>showLastAllDodokInfo(Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();

        List<Dodok> dodokList= dodokService.showLastAllDodoks(user);

        List<DodokInfoRes> dodokInfoResList = new ArrayList<>();

        for(Dodok dodok : dodokList){
            List<ReviewPage> reviewPageList = dodokService.getReviewPageList(dodok);
            List<ReviewEnd> reviewEndList = dodokService.getRivewEndList(dodok);
            DodokInfoRes dodokInfoRes =new DodokInfoRes(dodok,reviewPageList,reviewEndList);
            dodokInfoResList.add(dodokInfoRes);
        }

        return new ResponseEntity(dodokInfoResList,HttpStatus.OK);
    }

    // 책갈피는 여러개고 총평은 하나라는 것  생각하며 다시 살피기 !!
    // 책갈피 입력, 수정, 삭제, 조회(유저 기준, 도독 기준), 상세보기
    // 총평 입력, 수정, 삭제, 조회(유저 기준, 도독 기준), 상세보기


    //책갈피 입력 _ 현재 진행 중인 도독
    @PostMapping("/pageReview/add")
    public ResponseEntity<String> writePageReview(@RequestBody PageReviewCreatePostReq pageReviewCreatePostReq,Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        String res = dodokService.writePageReview(pageReviewCreatePostReq,user);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    //책갈피 수정 _ 현재 진행 중인 도독
    @PutMapping("/pageReview/update")
    public ResponseEntity<String> modifyPageReviews(@RequestBody PageReviewPutReq pageReviewPutReq, Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        boolean result =dodokService.modifyPageReview(pageReviewPutReq, user);
        if(result){
            return new ResponseEntity<>("수정이 완료됐습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("권한이 없어 수정에 실패했습니다.",HttpStatus.OK);
        }
    }

    //책갈피 삭제
    @DeleteMapping("/pageReview/{pageReviewId}")
    public ResponseEntity<String> deletePageReviews(@PathVariable Long pageReviewId
            ,Authentication authentication) throws Exception {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        boolean result =dodokService.deletePageReview(pageReviewId,user);
        if(result){
            return new ResponseEntity<>("삭제가 완료됐습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("권한이 없어 삭제에 실패했습니다.",HttpStatus.OK);
        }
    }

    //책갈피 조회 _ 상세보기
    @GetMapping("/pageReview/detail/{pageReviewId}")
    public ResponseEntity<?> showPageReviews(@PathVariable Long pageReviewId, Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        ReviewPage reviewPage = dodokService.getReviewPage(pageReviewId, user);

        if(reviewPage==null){
            //진행중인 도독 없는게 아니라, 리뷰페이지만 없는거일수 있음.
            return new ResponseEntity("볼 수 있는 권한이 없습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity(reviewPage, HttpStatus.OK);
        }
    }

    //책갈피 조회 _ 사용자 기준 현재 진행 중인 도독 기준 책갈피 총 목록
    @GetMapping("/pageReview/list")
    public ResponseEntity<?> listCurPageReviews(Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();

        List<ReviewPage> reviewPageList=dodokService.getCurReviewPageList(user);

        if(reviewPageList==null){
            //진행중인 도독 없는게 아니라, 리뷰페이지만 없는거일수 있음.
            return new ResponseEntity("진행 중인 도독이 없거나, 현재 작성된 리뷰가 없습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity(reviewPageList,HttpStatus.OK);
        }
    }


    /////////////////////////////////////////////////////////////////

    // 총리뷰 입력 _ 현재 진행 중인 도독
    @PostMapping("/endReview/add")
    public ResponseEntity<String> writeEndReview(@RequestBody EndReviewCreatePostReq endReviewCreatePostReq,Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        String res = dodokService.writeEndReview(endReviewCreatePostReq, user);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    // 총리뷰 수정 _ 현재 진행 중인 도독
    @PutMapping("/endReview/update")
    public ResponseEntity<String> modifyEndReviews(@RequestBody EndReviewModifyPutReq endReviewModifyPutReq, Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        boolean result =dodokService.modifyEndReview(endReviewModifyPutReq, user);
        if(result){
            return new ResponseEntity<>("수정이 완료됐습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("권한이 없어 수정에 실패했습니다.",HttpStatus.OK);
        }
    }

    // 총 리뷰 삭제
    @DeleteMapping("/endReview/{endReviewId}")
    public ResponseEntity<String> deleteEndReviews(@PathVariable Long endReviewId
            ,Authentication authentication) throws Exception {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        boolean result =dodokService.deleteEndReview(endReviewId, user);
        if(result){
            return new ResponseEntity<>("삭제가 완료됐습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity<>("권한이 없어 삭제에 실패했습니다.",HttpStatus.OK);
        }
    }

    // 총 리뷰 조회 _ 상세보기
    @GetMapping("/endReview/detail/{endReviewId}")
    public ResponseEntity<?> showEndReviews(@PathVariable Long endReviewId, Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        ReviewEnd reviewEnd = dodokService.getEndReview(endReviewId, user);

        if(reviewEnd==null){
            //진행중인 도독 없는게 아니라, 리뷰페이지만 없는거일수 있음.
            return new ResponseEntity("볼 수 있는 권한이 없습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity(reviewEnd, HttpStatus.OK);
        }
    }

    //총평 조회 _ 사용자 기준 현재 진행 중인 도독 기준 총평 총 목록
    @GetMapping("/endReview/list")
    public ResponseEntity<?> listCurEndReviews(Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();

        List<ReviewEnd> reviewEndList=dodokService.getCurRivewEndList(user);

        if(reviewEndList==null){
            //진행중인 도독 없는게 아니라, 리뷰페이지만 없는거일수 있음.
            return new ResponseEntity("진행 중인 도독이 없거나, 현재 작성된 리뷰가 없습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity(reviewEndList,HttpStatus.OK);
        }
    }

}
