package com.ssafy.ododok.api.response;

import lombok.Getter;

@Getter

public class UserRes {
    Long userId;
    String userName;
    String userNickname;
    String userEmail;
    String userPassword;
    String userPhone;
    String userImage;
    Integer userReviewcnt;
}
