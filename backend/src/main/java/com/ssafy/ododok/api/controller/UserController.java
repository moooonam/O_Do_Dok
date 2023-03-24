package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.dto.UserDto;
import com.ssafy.ododok.api.request.FindIdPostReq;
import com.ssafy.ododok.api.request.FindPasswordPostReq;
import com.ssafy.ododok.api.request.UserLoginPostReq;
import com.ssafy.ododok.api.request.UserRegisterPostReq;
import com.ssafy.ododok.api.response.DodokInfoRes;
import com.ssafy.ododok.api.response.ReviewInfoRes;
import com.ssafy.ododok.api.response.UserRes;
import com.ssafy.ododok.api.service.ReviewEndService;
import com.ssafy.ododok.api.service.ReviewPageService;
import com.ssafy.ododok.api.service.UserService;
import com.ssafy.ododok.common.auth.PrincipalDetails;
import com.ssafy.ododok.db.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ReviewPageService reviewPageService;
    private final ReviewEndService reviewEndService;

    @Autowired
    UserController(UserService userService,
                   ReviewPageService reviewPageService,
                   ReviewEndService reviewEndService){
        this.userService = userService;
        this.reviewPageService = reviewPageService;
        this.reviewEndService = reviewEndService;
    }

    // 이메일 중복확인
    @GetMapping("/checkEmail/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        try{
            userService.getUserByUserEmail(email);
        } catch(NoSuchElementException e){
            return ResponseEntity.status(200).body(true);
        }
        return ResponseEntity.status(200).body(false);
    }

    // 닉네임 중복확인
    @GetMapping("/checkNickname/{nickname}")
    public ResponseEntity<Boolean> checkNickname(@PathVariable String nickname) {
        try{
            userService.getUserByUserNickname(nickname);
        } catch(NoSuchElementException e){
            return ResponseEntity.status(200).body(true);
        }
        return ResponseEntity.status(200).body(false);
    }

    // 회원가입
    @PostMapping()
    public ResponseEntity<String> register(@RequestBody UserRegisterPostReq.Basic registerDto){
        int res = userService.createUserInfo(registerDto);

        if(res == 0){
            return ResponseEntity.status(400).body("회원등록에 실패하였습니다.");
        } else if(res == 1){
            return ResponseEntity.status(400).body("회원등록은 되었으나, 회원 설문등록에 실패하였습니다.");
        } else {
            return ResponseEntity.status(200).body("회원가입과 설문등록에 성공하였습니다.");
        }
    }

    // 나의 팀 정보 불러오기
    @GetMapping("/myTeam")
    public ResponseEntity<?> getUserTeam(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        Team team = userService.getUserTeam(user);
        return ResponseEntity.status(200).body(team);
    }

    // 회원정보 불러오기
    @GetMapping("/me")
    public ResponseEntity<?> getUserInfoSurvey(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
            UserDto.Basic ud = userService.getUserInfo(user);
            return ResponseEntity.status(200).body(ud);
    }

    // 회원 정보 수정하기
    @PutMapping
    public ResponseEntity<?> update(@RequestBody UserDto.Basic userDto, Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String userId = principal.getUser().getUserEmail();
        User user = userService.getUserByUserEmail(userId);
        UserSurvey userSurvey = userService.getUserByUser(user);

        int cnt = userService.updateUser(user, userDto);
        int cnt2 = userService.updateUserSurvey(userSurvey, userDto);
        if(cnt == 0){
            return ResponseEntity.status(200).body("회원 수정 실패");
        } else if(cnt2 == 0){
            return ResponseEntity.status(200).body("회원 설문조사 수정 실패");
        } else{
            return ResponseEntity.status(200).body("수정 완료");
        }

    }

    // 회원 삭제하기
    @DeleteMapping
    public ResponseEntity<?> remove(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String userId = principal.getUser().getUserEmail();
        User user = userService.getUserByUserEmail(userId);

        boolean check = userService.deleteUser(user);
        if(check){
            return ResponseEntity.status(200).body("삭제 완료");
        } else{
            return ResponseEntity.status(200).body("삭제 실패");
        }

    }

    // 이메일 찾기 전, 오도독의 회원 중 있는지 체크
    @PostMapping("/check/findId")
    public ResponseEntity<Boolean> id_find(@RequestBody FindIdPostReq findIdPostReq){
        boolean idFindCheck = userService.idCheck(findIdPostReq.getNickname(),findIdPostReq.getName());
        return ResponseEntity.status(200).body(idFindCheck);
    }

    // /check/findId에서 true가 나왔다면, 해당 회원의 이메일을 return
    @PostMapping("/check/findId/showId")
    public ResponseEntity<String> showId(@RequestBody FindIdPostReq findIdPostReq) throws Exception {
        User user = userService.getUserByUserNickname(findIdPostReq.getNickname());
        if(user == null){
            return ResponseEntity.status(404).body("존재하지 않는 계정입니다.");
        } else{
            return ResponseEntity.status(200).body(user.getUserEmail());
        }
    }

    // 비밀번호 찾기 전, 오도독의 회원 중 있는지 체크
    @PostMapping("/check/findPassword")
    public ResponseEntity<Boolean> password_find(@RequestBody FindPasswordPostReq findPasswordPostReq){
        boolean pwFindCheck = userService.passwordCheck(findPasswordPostReq.getEmail(),findPasswordPostReq.getName());
        return ResponseEntity.status(200).body(pwFindCheck);
    }

    // 마이페이지에서 본인이 쓴 리뷰 불러오기
    @GetMapping("/showReviewList")
    public ResponseEntity<?>showLastAllReview(Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        List<ReviewPage> reviewPageList = reviewPageService.getReviewPageList(user);
        List<ReviewEnd> reveiwEndList = reviewEndService.getReviewEndList(user);

        ReviewInfoRes reviewInfoRes =new ReviewInfoRes(user, reviewPageList,reveiwEndList);
        if(reviewInfoRes == null){
            return new ResponseEntity<>("검색 결과가 없습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity<>(reviewInfoRes,HttpStatus.OK);
        }
    }

    // /check/findPassword에서 true가 나왔다면, 해당 회원의 임시비밀번호를 이메일로 발급
    // 임시 비밀번호로 구현해야함 -> 이는 고도화로
//    @PostMapping("/check/findPassword/showPassword")
//    public ResponseEntity<String> showPassword(@RequestBody FindPasswordPostReq findPasswordPostReq) throws Exception {
//        User user = userService.getUserByUserEmail(findPasswordPostReq.getEmail());
//        if(user == null){
//            return ResponseEntity.status(404).body("존재하지 않는 계정입니다.");
//        } else{
//            return ResponseEntity.status(200).body();
//        }
//    }


}
