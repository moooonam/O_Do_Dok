package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.dto.UserDto;
import com.ssafy.ododok.api.request.UserModifyPostReq;
import com.ssafy.ododok.api.request.UserRegisterPostReq;
import com.ssafy.ododok.db.model.Team;
import com.ssafy.ododok.db.model.TeamUser;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.model.UserSurvey;
import com.ssafy.ododok.db.repository.TeamUserRepository;
import com.ssafy.ododok.db.repository.UserRepository;
import com.ssafy.ododok.db.repository.UserSurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserSurveyRepository userSurveyRepository;
    private final PasswordEncoder passwordEncoder;
    private final TeamUserRepository teamUserRepository;

    @Autowired
    UserServiceImpl(UserRepository userRepository,
                    UserSurveyRepository userSurveyRepository,
                    PasswordEncoder passwordEncoder,
                    TeamUserRepository teamUserRepository){
        this.userRepository = userRepository;
        this.userSurveyRepository = userSurveyRepository;
        this.passwordEncoder = passwordEncoder;
        this.teamUserRepository = teamUserRepository;
    }

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
    public UserSurvey getUserByUser(User user) {
        UserSurvey userSurvey = userSurveyRepository.findByUser(user);
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
    public int updateUserPassword(User user, String pwd, String modifyPassword) throws Exception {

        if(passwordEncoder.matches(pwd, user.getUserPassword())){
            try{
                user.changePassword(passwordEncoder.encode(modifyPassword));
                userRepository.save(user);
                return 1;
            }catch(Exception e){
                return 0;
            }
        } else{
            return -1;
        }
    }

    @Override
    public int updateUser(User user, UserModifyPostReq userModifyPostReq) {
        user.changeNickName(userModifyPostReq.getUserNickname());
        user.changeImg(userModifyPostReq.getUserImage());

        userRepository.save(user);

        return 1;
    }

    @Override
    public int updateUserSurvey(UserSurvey userSurvey, UserModifyPostReq userModifyPostReq) {
        userSurvey.changeUserGenre1(userModifyPostReq.getUserGenre1());
        userSurvey.changeUserGenre2(userModifyPostReq.getUserGenre2());
        userSurvey.changeUserGenre3(userModifyPostReq.getUserGenre3());
        userSurvey.changeUserRegion(userModifyPostReq.getUserRegion());
        userSurvey.changeUserOnoff(userModifyPostReq.getUserOnoff());
        userSurvey.changeUserFrequency(userModifyPostReq.getUserFrequency());

        userSurveyRepository.save(userSurvey);

        return 1;
    }

    @Override
    public boolean deleteUser(User user) {
        UserSurvey userSurvey = userSurveyRepository.findByUser(user);
        // 관련된 정보들 모두 삭제 (리뷰, 모임 등등)
         try{
             userSurveyRepository.delete(userSurvey);
             userRepository.delete(user);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean idCheck(String nickname, String name) {
        try{
            User user = userRepository.findByUserNickname(nickname).get();
            if(user!=null && user.getUserName().equals(name)) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean passwordCheck(String email, String name) {
        try{
            User user = userRepository.findByUserEmail(email).get();
            if(user!=null && user.getUserName().equals(name)) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e){
            return false;
        }
    }

    @Override
    public Team getUserTeam(User user) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        return team;
    }
}
