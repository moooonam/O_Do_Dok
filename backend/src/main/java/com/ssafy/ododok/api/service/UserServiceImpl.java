package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.dto.UserDto;
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
        User user = userRepository.findByUserEmail(userEmail);
        return user;
    }

    @Override
    public User getUserByUserNickname(String userNickname) {
        User user = userRepository.findByUserNickname(userNickname).get();
        return user;
    }

    @Override
    public UserSurvey getUserByUser(User user) {
        int userId = user.getUserId();
        UserSurvey userSurvey = userSurveyRepository.findByUser(user);
//        UserSurvey userSurvey = userSurveyRepository.findByUser_userId(user);
        return userSurvey;
    }

    @Override
    public int createUserInfo(UserRegisterPostReq.Basic registerDto) {
        int cnt = 0;

        User user = User.builder()
                .userName(registerDto.getName())
                .userNickname(registerDto.getNickname())
                .userEmail(registerDto.getEmail())
                .userPassword(passwordEncoder.encode(registerDto.getPassword()))
                .userPhone(registerDto.getPhone())
                .build();

        try{
            userRepository.save(user);
            cnt = cnt + 1;
        } catch (Exception e){
            return cnt;
        }

        UserSurvey userSurvey = UserSurvey.builder()
                .user(user)
                .userSurveyId(registerDto.getId())
                .userGender(registerDto.getGender())
                .userAge(registerDto.getAge())
                .userGenre1(registerDto.getGenre1())
                .userGenre2(registerDto.getGenre2())
                .userGenre3(registerDto.getGenre3())
                .userRegion(registerDto.getRegion())
                .userOnoff(registerDto.getOnoff())
                .userFrequency(registerDto.getFrequency())
                .build();

        try{
            userSurveyRepository.save(userSurvey);
            cnt = cnt + 1;
        } catch(Exception e){
            return cnt;
        }

        return cnt;

    }

    @Override
    public UserDto.Basic getUserInfo(User user) {
        UserSurvey userSurvey = userSurveyRepository.findByUser(user);
        UserDto.Basic ud = UserDto.Basic.builder()
                .id(user.getUserId())
                .userName(user.getUserName())
                .userNickname(user.getUserNickname())
                .userEmail(user.getUserEmail())
                .userPhone(user.getUserPhone())
                .userImage(user.getUserImage())
                .userReviewcnt(user.getUserReviewcnt())
                .userGender(userSurvey.getUserGender())
                .userAge(userSurvey.getUserAge())
                .userGenre1(userSurvey.getUserGenre1())
                .userGenre2(userSurvey.getUserGenre2())
                .userGenre3(userSurvey.getUserGenre3())
                .userRegion(userSurvey.getUserRegion())
                .userOnoff(userSurvey.getUserOnoff())
                .userFrequency(userSurvey.getUserFrequency())
                .build();

        return ud;
    }

    @Override
    public int updateUser(User user, UserDto.Basic userDto) {
        user.changeName(userDto.getUserName());
        user.changeNickName(userDto.getUserNickname());
        user.changePassword(userDto.getUserPassword());
        user.changePhone(userDto.getUserPhone());
        user.changeImg(userDto.getUserImage());

        userRepository.save(user);

        return 1;
    }

    @Override
    public int updateUserSurvey(UserSurvey userSurvey, UserDto.Basic userDto) {
        userSurvey.changeUserGenre1(userDto.getUserGenre1());
        userSurvey.changeUserGenre2(userDto.getUserGenre2());
        userSurvey.changeUserGenre3(userDto.getUserGenre3());
        userSurvey.changeUserRegion(userDto.getUserRegion());
        userSurvey.changeUserOnoff(userDto.getUserOnoff());
        userSurvey.changeUserFrequency(userDto.getUserFrequency());

        userSurveyRepository.save(userSurvey);

        return 1;
    }

    @Override
    public boolean deleteUser(User user) {
        try{
            userRepository.delete(user);
            return true;
        } catch (Exception e){
            return false;
        }
    }




}
