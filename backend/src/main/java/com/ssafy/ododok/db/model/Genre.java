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
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int genreResultId;

    @OneToOne
    @JoinColumn(name="team_id")
    private Team team;


    @Column(nullable = false)
    private double reasonRating;

    @Column(nullable = false)
    private int reasonCnt;

    @Column(nullable = false)
    private double thrillRating;

    @Column(nullable = false)
    private int thrillCnt;

    @Column(nullable = false)
    private double horrorRating;

    @Column(nullable = false)
    private int horrorCnt;

    @Column(nullable = false)
    private double sfRating;

    @Column(nullable = false)
    private int sfCnt;

    @Column(nullable = false)
    private double fantasyRating;

    @Column(nullable = false)
    private int fantasyCnt;

    @Column(nullable = false)
    private double dramaRating;

    @Column(nullable = false)
    private int dramaCnt;

    @Column(nullable = false)
    private double gameRating;

    @Column(nullable = false)
    private int gameCnt;

    @Column(nullable = false)
    private double romanceRating;

    @Column(nullable = false)
    private int romanceCnt;

    @Column(nullable = false)
    private double animationRating;

    @Column(nullable = false)
    private int animationCnt;


}
