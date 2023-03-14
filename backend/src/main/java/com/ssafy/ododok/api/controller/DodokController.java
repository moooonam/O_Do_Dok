package com.ssafy.ododok.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dodok")
public class DodokController {

    @GetMapping({"/",""})
    public String startDodok(){
        return "hello Dodok";
    }

    /**
     * 도독과 관련 API
     @author 김경삼
     */
    //책 조회
    @GetMapping("/listbook")
    public ResponseEntity<String> listBooks(){

        return null;
    }
    //책 선택
    @PostMapping("/selectbook")
    public ResponseEntity<String> selectBook(){

        return null;
    }
    //도독 시작

    //도독 종료

    //도독 삭제
    @DeleteMapping
    public ResponseEntity<String> deleteDodok(){
        return null;
    }

    /**
     책 리뷰 관련 API
     @author 김경삼
    */
    //책갈피 조회
    @GetMapping
    public ResponseEntity<String> listPageReviews(){
        return null;
    }
    //책갈피 입력
    @PostMapping
    public ResponseEntity<String> writePageReviews(){
        return null;
    }
    //책갈피 수정
    @PutMapping
    public ResponseEntity<String> modifyPageReviews(){
        return null;
    }
    //책갈피 삭제
    @DeleteMapping
    public ResponseEntity<String> deletePageReviews(){
        return null;
    }
    //책 총평 조회
    @GetMapping
    public ResponseEntity<String> listPageEndReviews(){

        return null;
    }
    //책 총평 입력
    @PostMapping
    public ResponseEntity<String> writePageEndReviews(){
        return  null;
    }
    //책 총평 수정
    @PutMapping
    public ResponseEntity<String> modifyPageEndReviews(){
        return  null;

    }
    //책 총평 삭제
    @DeleteMapping
    public ResponseEntity<String> deletePageEndReviews(){
        return  null;
    }
}
