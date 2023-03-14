package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.UserRegisterPostReq;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.model.UserSurvey;
import com.ssafy.ododok.db.repository.UserRepository;
import com.ssafy.ododok.db.repository.UserSurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserSurveyRepository userSurveyRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User getUserByUserEmail(String userEmail) {
        User user = userRepository.findByUserEmail(userEmail).get();
        return user;
    }

    @Override
    public User getUserByUserNickname(String userNickname) {
        User user = userRepository.findByUserNickname(userNickname).get();
        return user;
    }

    @Override
    public int createUserInfo(UserRegisterPostReq userInfo) {

        int cnt = 0;

        User user = new User();

        user.setUserName(userInfo.getName());
        user.setUserEmail(userInfo.getEmail());
        user.setUserNickname(userInfo.getNickname());
        user.setUserPassword(passwordEncoder.encode(userInfo.getPassword()));
        user.setUserPhone(userInfo.getPhone());

        try{
            userRepository.save(user);
            cnt = cnt + 1;
        } catch (Exception e){
            return cnt;
        }


        UserSurvey userSurvey = new UserSurvey();

        userSurvey.setUser(user);
        userSurvey.setUserGender(userInfo.getGender());
        userSurvey.setUserAge(userInfo.getAge());
        userSurvey.setUserGenre1(userInfo.getGenre1());
        userSurvey.setUserGenre2(userInfo.getGenre2());
        userSurvey.setUserGenre3(userInfo.getGenre3());
        userSurvey.setUserRegion(userInfo.getRegion());
        userSurvey.setUserOnoff(userInfo.getOnoff());
        userSurvey.setUserFrequency(userInfo.getFrequency());

        try{
            userSurveyRepository.save(userSurvey);
            cnt = cnt + 1;
        } catch(Exception e){
            return cnt;
        }

        return cnt;
    }

}
