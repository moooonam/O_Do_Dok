package com.ssafy.ododok.db.model;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicInsert
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String userNickname;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String userPassword;

    @Column(nullable = false)
    private String userPhone;

    @ColumnDefault("'https://cdn-icons-png.flaticon.com/512/5264/5264565.png'")
    private String userImage;

    @ColumnDefault("0")
    private Integer userReviewcnt;

    public void changeNickName(String nickname){
        this.userNickname = nickname;
    }
    public void changePassword(String password){
        this.userPassword =password;
    }
    public void changeImg(String img){
        this.userImage=img;
    }
    public void changeReviewcnt(int userReviewcnt){
        this.userReviewcnt=userReviewcnt;
    }

    @Builder
    public User(String userName, String userNickname, String userEmail, String userPassword, String userPhone) {
        this.userName = userName;
        this.userNickname = userNickname;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userPhone = userPhone;
    }

}
