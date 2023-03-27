package com.ssafy.ododok.api.request;

import com.ssafy.ododok.db.model.Onoff;
import lombok.Getter;

@Getter
public class UserModifyPostReq {
    String userName;
    String userNickname;
    String userEmail;
    String userImage;
    String userGenre1;
    String userGenre2;
    String userGenre3;
    String userRegion;
    Onoff userOnoff;
    int userFrequency;
}
