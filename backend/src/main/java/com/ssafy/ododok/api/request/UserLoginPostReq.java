package com.ssafy.ododok.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
public class UserLoginPostReq {
    String email;
    String password;

}
