package com.ssafy.ododok.db.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    private String genre;

    @Column(nullable = false)
    private double rating;

    @Column(nullable = false)
    private int cnt;

    @Builder
    public Genre(Team team, String genre, double rating, int cnt) {
        this.team = team;
        this.genre = genre;
        this.rating = rating;
        this.cnt = cnt;
    }

    public void changeRating(double rating){
        this.rating = rating;
    }

    public void changeCnt(int cnt){
        this.cnt = cnt;
    }

//    // 추리/미스터리
//    @Column(nullable = false)
//    private double reasonRating;
//
//    @Column(nullable = false)
//    private int reasonCnt;
//
//    // 판타지
//    @Column(nullable = false)
//    private double fantasyRating;
//
//    @Column(nullable = false)
//    private int fantasyCnt;
//
//    // SF
//    @Column(nullable = false)
//    private double sfRating;
//
//    @Column(nullable = false)
//    private int sfCnt;
//
//    // 호러
//    @Column(nullable = false)
//    private double horrorRating;
//
//    @Column(nullable = false)
//    private int horrorCnt;
//
//    // 무협
//    @Column(nullable = false)
//    private double martialRating;
//
//    @Column(nullable = false)
//    private int martialCnt;
//
//    // 스릴러
//    @Column(nullable = false)
//    private double thrillRating;
//
//    @Column(nullable = false)
//    private int thrillCnt;
//
//    // 로맨스
//    @Column(nullable = false)
//    private double romanceRating;
//
//    @Column(nullable = false)
//    private int romanceCnt;
//
//    public void changeReasonRating(double reasonRating){
//        this.reasonRating = reasonRating;
//    }
//    public void changeReasonCnt(int reasonCnt){
//        this.reasonCnt = reasonCnt;
//    }
//    public void changeFantasyRating(double fantasyRating){
//        this.fantasyRating = fantasyRating;
//    }
//    public void changeFantasyCnt(int fantasyCnt){
//        this.fantasyCnt = fantasyCnt;
//    }
//    public void changeSfRating(double sfRating){
//        this.sfRating = sfRating;
//    }
//    public void changeSfCnt(int sfCnt){
//        this.sfCnt = sfCnt;
//    }
//    public void changeHorrorRating(double horrorRating){
//        this.horrorRating = horrorRating;
//    }
//    public void changeHorrorCnt(int horrorCnt){
//        this.horrorCnt = horrorCnt;
//    }
//    public void changeMartialRating(double martialRating){
//        this.martialRating = martialRating;
//    }
//    public void changeMartialCnt(int martialCnt){
//        this.martialCnt = martialCnt;
//    }
//    public void changeThrillRating(double thrillRating){
//        this.thrillRating = thrillRating;
//    }
//    public void changeThrillCnt(int thrillCnt){
//        this.thrillCnt = thrillCnt;
//    }
//    public void changeRomanceRating(double romanceRating){
//        this.romanceRating = romanceRating;
//    }
//    public void changeRomanceCnt(int romanceCnt){
//        this.romanceCnt = romanceCnt;
//    }

}
