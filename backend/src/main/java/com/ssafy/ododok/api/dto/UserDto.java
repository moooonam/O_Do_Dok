package com.ssafy.ododok.api.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.ododok.db.model.Gender;
import com.ssafy.ododok.db.model.Onoff;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class UserDto {

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
        int id;
        String userName;
        String userNickname;
        String userEmail;
        String userPassword;
        String userPhone;
        String userImage;
        int userReviewcnt;
        Gender userGender;
        int userAge;
        String userGenre1;
        String userGenre2;
        String userGenre3;
        String userRegion;
        Onoff userOnoff;
        int userFrequency;
    }
}
