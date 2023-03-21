package com.ssafy.ododok.api.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.ododok.db.model.Gender;
import com.ssafy.ododok.db.model.Onoff;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterPostReq {

    @Getter
    @AllArgsConstructor
    public static class Id {
        private int userId;
    }

    @Getter
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @AllArgsConstructor
    public static class Basic {
        Long id;
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

}
