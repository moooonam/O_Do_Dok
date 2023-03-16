package com.ssafy.ododok.db.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
public class UserSurvey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userSurveyId;

    @OneToOne
    @JoinColumn(name="user_id")
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
    private String userInterests;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Onoff userOnoff;

    @Column(nullable = false)
    private int userFrequency;

}
