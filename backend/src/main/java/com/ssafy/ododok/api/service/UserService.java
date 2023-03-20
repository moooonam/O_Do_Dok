package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.dto.UserDto;
import com.ssafy.ododok.api.request.UserRegisterPostReq;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.model.UserSurvey;

public interface UserService {
    User getUserByUserEmail(String userEmail);
    User getUserByUserNickname(String userNickname);
    UserSurvey getUserByUser(User user);

    int createUserInfo(UserRegisterPostReq.Basic registerDto);
    UserDto.Basic getUserInfo(User user);
    int updateUser(User user, UserDto.Basic userDto);
    int updateUserSurvey(UserSurvey userSurvey, UserDto.Basic userDto);
    boolean deleteUser(User user);

}
