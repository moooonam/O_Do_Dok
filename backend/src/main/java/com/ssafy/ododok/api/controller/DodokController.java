package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.DodokCreateReq;
import com.ssafy.ododok.api.response.DodokInfoRes;
import com.ssafy.ododok.api.service.BookService;
import com.ssafy.ododok.api.service.DodokService;
import com.ssafy.ododok.db.model.*;
import com.ssafy.ododok.db.repository.BookRepository;
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
    @Autowired
    BookService bookService;

    @Autowired
    DodokService dodokService;

    @GetMapping({"/",""})
    public String helloDodok(){
        return "hello Dodok";
    }

    /**
     * 도독과 관련 API
     @author 김경삼
     */
    //책 조회
    @GetMapping("/listbook")
    public ResponseEntity<List<Book>> listBooks(){
        List<Book> bookList = bookService.listBooks();
        return new ResponseEntity(bookList,HttpStatus.OK);
    }

    //책 선택
    @PostMapping("/selectbook")
    public ResponseEntity<String> selectBook(String isbn){

        return null;
    }

    //도독 시작
    @PostMapping
    public ResponseEntity<String> startDodok(DodokCreateReq dodokCreateReq,Authentication auth) {

        //나중에 auth에서 가져오는 것으로 대체
        User user = new User();
        dodokService.startDodok(user,dodokCreateReq);
        return new ResponseEntity("새로운 도독을 생성했습니다.",HttpStatus.OK);
    }

    //도독 종료
    @PutMapping
    public ResponseEntity<String> endDodok(){

        return null;
    }
    //도독 삭제
    @DeleteMapping
    public ResponseEntity<String> deleteDodok() {

        return null;
    }
    @GetMapping("/lastdodoks")
    public ResponseEntity<List<DodokInfoRes>>showLastAllDodokInfo(Authentication auth){
        //security Authentication에서 User 가져오기.
        User user= new User();
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

    /**
     책 리뷰 관련 API
     @author 김경삼
    */
    //책갈피 조회
    @GetMapping
    public ResponseEntity<?> listCurPageReviews(Authentication auth){
        User user = new User();
        List<ReviewPage> reviewPageList=dodokService.getCurReviewPageList(user);
        if(reviewPageList==null){
            return new ResponseEntity("현재 진행중인 도독이 없습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity(reviewPageList,HttpStatus.OK);
        }
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
