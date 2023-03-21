package com.ssafy.ododok.api.response;

import com.ssafy.ododok.db.model.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRes {

    long userId;
    String userName;
    String userNickname;
    String userEmail;
    String userPassword;
    String userPhone;
    String userImage;
    Integer userReviewcnt;

    public static UserRes of(User user){
        UserRes res = new UserRes();

        res.setUserId(user.getUserId());
        res.setUserName(user.getUserName());
        res.setUserNickname(user.getUserNickname());
        res.setUserEmail(user.getUserEmail());
        res.setUserPassword(user.getUserPassword());
        res.setUserPhone(user.getUserPhone());
        res.setUserImage(user.getUserImage());
        res.setUserReviewcnt(user.getUserReviewcnt());

        return res;
    }

}
