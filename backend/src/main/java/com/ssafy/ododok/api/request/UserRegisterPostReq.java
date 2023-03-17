package com.ssafy.ododok.api.request;

import com.ssafy.ododok.db.model.Gender;
import com.ssafy.ododok.db.model.Onoff;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterPostReq {

    String name;
    String email;
    String nickname;
    String password;
    String phone;
    Gender gender;
    int age;
    String genre1;
    String genre2;
    String genre3;
    String region;
    Onoff onoff;
    int frequency;

}
