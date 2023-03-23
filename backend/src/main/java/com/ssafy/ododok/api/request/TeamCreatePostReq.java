package com.ssafy.ododok.api.request;

import com.ssafy.ododok.db.model.Onoff;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
public class TeamCreatePostReq {
    private String teamName;
    private int teamMemberCntMax;
    private Onoff teamOnoff;
    private String teamRegion;
    private String teamGenre1;
    private String teamGenre2;
    private String teamGenre3;
}
