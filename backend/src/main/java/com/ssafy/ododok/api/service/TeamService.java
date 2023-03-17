package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.TeamCreatePostReq;
import com.ssafy.ododok.api.request.TeamModifyPatchReq;
import com.ssafy.ododok.db.model.Team;

import java.util.List;

public interface TeamService {
    Team createTeam(TeamCreatePostReq teamCreatePostReq);

    List<Team> getAllTeams();

    List<Team> getTeamInfoByTeamName(String teamName);

    Team modifyTeam(Long teamId, TeamModifyPatchReq teamModifyPatchReq);

    void deleteTeam(Long teamId);
}
