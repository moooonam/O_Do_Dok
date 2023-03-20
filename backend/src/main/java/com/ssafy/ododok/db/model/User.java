package com.ssafy.ododok.db.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

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

    @Column
    private String userImage;

    @ColumnDefault("0")
    private Integer userReviewcnt;

    public void changeName(String name){
        this.userName = name;
    }
    public void changeNickName(String nickname){
        this.userNickname = nickname;
    }
    public void changePassword(String password){
        this.userPassword =password;
    }
    public void changePhone(String phone){
        this.userPhone=phone;
    }
    public void changeImg(String img){
        this.userImage=img;
    }

}
