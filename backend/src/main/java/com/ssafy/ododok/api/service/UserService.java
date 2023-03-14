package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.UserRegisterPostReq;
import com.ssafy.ododok.db.model.User;

public interface UserService {

    int createUserInfo(UserRegisterPostReq userInfo);
    User getUserByUserEmail(String userEmail);
    User getUserByUserNickname(String userNickname);

}
