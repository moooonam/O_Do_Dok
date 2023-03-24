package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.dto.UserDto;
import com.ssafy.ododok.api.request.FindIdPostReq;
import com.ssafy.ododok.api.request.FindPasswordPostReq;
import com.ssafy.ododok.api.request.UserLoginPostReq;
import com.ssafy.ododok.api.request.UserRegisterPostReq;
import com.ssafy.ododok.api.response.UserRes;
import com.ssafy.ododok.api.service.UserService;
import com.ssafy.ododok.common.auth.PrincipalDetails;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.model.UserSurvey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    UserController(UserService userService){
        this.userService = userService;
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

    // 회원정보 불러오기
    @GetMapping("/me")
    public ResponseEntity<?> getUserInfoSurvey(Authentication authentication) {
//        try{
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
            String userId = principal.getUser().getUserEmail();
            User user = userService.getUserByUserEmail(userId);
            UserDto.Basic ud = userService.getUserInfo(user);
            return ResponseEntity.status(200).body(ud);
//        } catch (NullPointerException e){
//            return ResponseEntity.status(200).body("토큰 만료돼서 다시 생성했으니 봐!");
//        }
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

    // 나의 리뷰 출력 (개인 리뷰)

}
