package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.UserLoginPostReq;
import com.ssafy.ododok.api.request.UserRegisterPostReq;
import com.ssafy.ododok.api.service.UserService;
import com.ssafy.ododok.db.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/user")
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

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginPostReq loginInfo) {
        String userEmail = loginInfo.getEmail();
        String password = loginInfo.getPassword();

        User user = userService.getUserByUserEmail(userEmail);

        if(user == null){
            return ResponseEntity.status(404).body("존재하지 않는 계정입니다.");
        } else{
            if(passwordEncoder.matches(password, user.getUserPassword())) {
                return ResponseEntity.status(200).body("로그인에 성공하였습니다. 생성된 토큰은 header에 들어있습니다.");
            }
        }


        return ResponseEntity.status(401).body("잘못된 비밀번호입니다.");
    }

}
