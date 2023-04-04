package com.ssafy.ododok.db.model;

import com.ssafy.ododok.api.request.TeamModifyPatchReq;
import com.ssafy.ododok.common.util.BooleanToYNConverter;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicInsert
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId;

    @Column(nullable = false)
    private String teamName;

    @ColumnDefault("1")
    private Integer teamMemberCnt;

    @Column(nullable = false)
    private int teamMemberCntMax;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Onoff teamOnoff;

    @ColumnDefault("1")
    private boolean teamRecruit;

    @Convert(converter = BooleanToYNConverter.class)
    @ColumnDefault("false")
    private boolean isOngoingDodok;

    @Column(columnDefinition = "LONGTEXT")
    private String teamRecruitText;

    @Column(nullable = false)
    private String teamRegion;

    @Column(nullable = false)
    private String teamGenre1;

    @Column
    private String teamGenre2;

    @Column
    private String teamGenre3;

    @Column
    private String teamTopGenre;

    @ColumnDefault("'no rule'")
    private String teamRule1;

    @ColumnDefault("'no rule'")
    private String teamRule2;

    @ColumnDefault("'no rule'")
    private String teamRule3;

    @ColumnDefault("'https://cdn.pixabay.com/photo/2018/01/18/20/43/literature-3091212_960_720.jpg'")
    private String teamImage;

    @Column
    private double teamAge;

    public void updateTeam(TeamModifyPatchReq teamModifyPatchReq){
        this.teamMemberCntMax = teamModifyPatchReq.getTeamMemberCntMax();
        this.teamOnoff = teamModifyPatchReq.getTeamOnoff();
        this.teamRegion = teamModifyPatchReq.getTeamRegion();
        this.teamGenre1 = teamModifyPatchReq.getTeamGenre1();
        this.teamGenre2 = teamModifyPatchReq.getTeamGenre2();
        this.teamGenre3 = teamModifyPatchReq.getTeamGenre3();
        this.teamRecruit = teamModifyPatchReq.isTeamRecruit();
        this.teamRecruitText = teamModifyPatchReq.getTeamRecruitText();
        this.teamRule1 = teamModifyPatchReq.getTeamRule1();
        this.teamRule2 = teamModifyPatchReq.getTeamRule2();
        this.teamRule3 = teamModifyPatchReq.getTeamRule3();
        this.teamImage = teamModifyPatchReq.getTeamImage();
    }

    public void changeIsOngoingDodok(boolean isOngoingDodok){
        this.isOngoingDodok = isOngoingDodok;
    }
    public void changeTeamTopGenre(String teamTopGenre){
        this.teamTopGenre = teamTopGenre;
    }
    public void changeTeamAge(double teamAge){
        this.teamAge = teamAge;
    }
    public void changeTeamMemberCnt(Integer teamMemberCnt){
        this.teamMemberCnt = teamMemberCnt;
    }

    @Builder
    public Team(String teamName, int teamMemberCntMax, Onoff teamOnoff, String teamRegion,
                String teamGenre1, String teamGenre2, String teamGenre3,
                boolean teamRecruit, double teamAge) {
        this.teamName = teamName;
        this.teamMemberCntMax = teamMemberCntMax;
        this.teamOnoff = teamOnoff;
        this.teamRegion = teamRegion;
        this.teamGenre1 = teamGenre1;
        this.teamGenre2 = teamGenre2;
        this.teamGenre3 = teamGenre3;
        this.teamRecruit = teamRecruit;
        this.teamAge = teamAge;
    }

}

