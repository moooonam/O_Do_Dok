package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.dto.UserDto;
import com.ssafy.ododok.api.request.UserModifyPostReq;
import com.ssafy.ododok.api.request.UserRegisterPostReq;
import com.ssafy.ododok.db.model.Team;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.model.UserSurvey;

public interface UserService {
    User getUserByUserEmail(String userEmail);
    User getUserByUserNickname(String userNickname);
    UserSurvey getUserByUser(User user);

    int createUserInfo(UserRegisterPostReq.Basic registerDto);
    UserDto.Basic getUserInfo(User user);
    int updateUserPassword(User user, String pwd, String modifyPassword) throws Exception;
    int updateUser(User user, UserModifyPostReq userModifyPostReq);
    int updateUserSurvey(UserSurvey userSurvey, UserModifyPostReq userModifyPostReq);
    boolean deleteUser(User user);

    boolean idCheck(String email, String name);

    boolean passwordCheck(String email, String name);

    Team getUserTeam(User user);

    String getPassword(String password);
}
