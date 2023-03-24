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

    // 지난 도독 리스트 가져오기 _ 해당 모임의 회원이 아니면 공개만 보일 수 있도록 처리해야함 !!!!
    @GetMapping("/lastdodoks/{teamId}")
    public ResponseEntity<?>showLastAllDodokInfo(@PathVariable Long teamId, Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();

        List<Dodok> dodokList= dodokService.showLastAllDodoks(user, teamId);

        return dodokInfoResList(dodokList);
    }

    // 도독 공개 설정
    @PutMapping("/dodokOpen/updateTrue/{dodokId}")
    public ResponseEntity<String> updateDodokOpen(@PathVariable Long dodokId, Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        String res = dodokService.updateDodokOpen(user, dodokId);
        return new ResponseEntity(res, HttpStatus.OK);
    }

    // 도독 비공개 설정
    @PutMapping("/dodokOpen/updateFalse/{dodokId}")
    public ResponseEntity<String> updateDodokClose(@PathVariable Long dodokId, Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        String res =  dodokService.updateDodokClose(user, dodokId);
        return new ResponseEntity(res, HttpStatus.OK);
    }

    // 책을 검색하면 관련된 도독이 나올 수 있도록

    // 도독 검색
    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> searchDodoks(@PathVariable String keyword){

        List<Dodok> dodokList= dodokService.searchDodoks(keyword);

        return dodokInfoResList(dodokList);
    }

    public User getUser(Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        return user;
    }

    public ResponseEntity<?> dodokInfoResList(List<Dodok> dodokList){
        List<DodokInfoRes> dodokInfoResList = new ArrayList<>();

        for(Dodok dodok : dodokList){
            List<ReviewPage> reviewPageList = dodokService.getReviewPageList(dodok);
            List<ReviewEnd> reviewEndList = dodokService.getRivewEndList(dodok);
            DodokInfoRes dodokInfoRes =new DodokInfoRes(dodok,reviewPageList,reviewEndList);
            dodokInfoResList.add(dodokInfoRes);
        }

        if(dodokInfoResList.size()==0){
            return new ResponseEntity<>("검색 결과가 없습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity<>(dodokInfoResList,HttpStatus.OK);
        }
    }

}
