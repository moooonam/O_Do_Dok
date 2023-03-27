package com.ssafy.ododok.api.request;

import com.ssafy.ododok.db.model.Onoff;
import lombok.Getter;

@Getter
public class TeamModifyPatchReq {
    private Onoff teamOnoff;
    private String teamRegion;
    private String teamGenre1;
    private String teamGenre2;
    private String teamGenre3;
    private int teamMemberCntMax;
    private boolean teamRecruit;
    private String teamRecruitText;
    private String teamRule1;
    private String teamRule2;
    private String teamRule3;
}
