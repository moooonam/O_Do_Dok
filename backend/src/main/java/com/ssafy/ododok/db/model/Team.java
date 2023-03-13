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
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teamId;

    @Column(nullable = false)
    private String teamName;

    @Column(nullable = false)
    private int teamMembercnt;

    @Column(nullable = false)
    private int teamMembercntMax;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Onoff teamOnoff;

    @Column(nullable = false)
    private boolean teamRecruit;

    @Column
    private String teamRecruitText;

    @Column(columnDefinition = "LONGTEXT")
    private String teamRegion;


}

