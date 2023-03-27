package com.ssafy.ododok.db.model;

import com.ssafy.ododok.api.request.TeamModifyPatchReq;
import com.ssafy.ododok.common.util.BooleanToYNConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @ColumnDefault("'no rule'")
    private String teamRule1;

    @ColumnDefault("'no rule'")
    private String teamRule2;

    @ColumnDefault("'no rule'")
    private String teamRule3;

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
    }

}

