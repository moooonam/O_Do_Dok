package com.ssafy.ododok.db.model;

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

    @Column
    private boolean teamRecruit = true;

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
}

