package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.UserLoginPostReq;
import com.ssafy.ododok.api.request.UserRegisterPostReq;
import com.ssafy.ododok.api.response.UserRes;
import com.ssafy.ododok.api.service.UserService;
import com.ssafy.ododok.common.auth.PrincipalDetails;
import com.ssafy.ododok.db.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/checkEmail/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        try{
            userService.getUserByUserEmail(email);
        } catch(NoSuchElementException e){
            return ResponseEntity.status(200).body(true);
        }
        return ResponseEntity.status(200).body(false);
    }

    @GetMapping("/checkNickname/{nickname}")
    public ResponseEntity<Boolean> checkNickname(@PathVariable String nickname) {
        try{
            userService.getUserByUserNickname(nickname);
        } catch(NoSuchElementException e){
            return ResponseEntity.status(200).body(true);
        }
        return ResponseEntity.status(200).body(false);
    }

    @PostMapping()
    public ResponseEntity<String> register(@RequestBody UserRegisterPostReq userInfo){
        int res = userService.createUserInfo(userInfo);

        if(res == 0){
            return ResponseEntity.status(400).body("회원등록에 실패하였습니다.");
        } else if(res == 1){
            return ResponseEntity.status(400).body("회원등록은 되었으나, 회원 설문등록에 실패하였습니다.");
        } else {
            return ResponseEntity.status(200).body("회원가입과 설문등록에 성공하였습니다.");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getStudentInfo(Authentication authentication) {
        System.out.println("ㅋㅋ");
        try{
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
            String userId = principal.getUser().getUserEmail();
            User user = userService.getUserByUserEmail(userId);
            return ResponseEntity.status(200).body(UserRes.of(user));
        } catch (Exception e){
            return ResponseEntity.status(200).body("토큰 만료돼서 다시 생성했으니 봐!");
        }
    }

}
