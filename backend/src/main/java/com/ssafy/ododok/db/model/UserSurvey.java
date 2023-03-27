package com.ssafy.ododok.db.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicInsert
public class UserSurvey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSurveyId;

    @OneToOne
    @JoinColumn(name="userId")
    private User user;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender userGender;

    @Column(nullable = false)
    private int userAge;

    @Column(nullable = false)
    private String userGenre1;

    @Column
    private String userGenre2;

    @Column
    private String userGenre3;

    @Column(nullable = false)
    private String userRegion;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Onoff userOnoff;

    @Column(nullable = false)
    private int userFrequency;

    public void changeUserGenre1(String userGenre1){
        this.userGenre1 = userGenre1;
    }
    public void changeUserGenre2(String userGenre2){
        this.userGenre2 = userGenre2;
    }
    public void changeUserGenre3(String userGenre3){
        this.userGenre3 = userGenre3;
    }
    public void changeUserRegion(String userRegion){
        this.userRegion = userRegion;
    }
    public void changeUserOnoff(Onoff userOnoff){
        this.userOnoff = userOnoff;
    }
    public void changeUserFrequency(int userFrequency){
        this.userFrequency = userFrequency;
    }

    @Builder
    public UserSurvey(User user, Gender userGender, int userAge, String userGenre1, String userGenre2, String userGenre3, String userRegion, Onoff userOnoff, int userFrequency) {
        this.user = user;
        this.userGender = userGender;
        this.userAge = userAge;
        this.userGenre1 = userGenre1;
        this.userGenre2 = userGenre2;
        this.userGenre3 = userGenre3;
        this.userRegion = userRegion;
        this.userOnoff = userOnoff;
        this.userFrequency = userFrequency;
    }

}
