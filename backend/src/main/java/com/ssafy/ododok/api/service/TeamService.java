package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.TeamCreatePostReq;
import com.ssafy.ododok.api.request.TeamModifyPatchReq;
import com.ssafy.ododok.db.model.Role;
import com.ssafy.ododok.db.model.Team;
import com.ssafy.ododok.db.model.TeamUser;
import com.ssafy.ododok.db.model.User;

import java.util.List;
import java.util.Optional;

public interface TeamService {
    void createTeam(TeamCreatePostReq teamCreatePostReq, User user);

    List<Team> getAllTeams();

    List<Team> getTeamInfoByTeamName(String teamName);

    Team modifyTeam(Long teamId, TeamModifyPatchReq teamModifyPatchReq);

    void deleteTeam(Long teamId);

    // 팀 만들 시
    void addAdmin(Long teamId, User user);

    // 멤버 초대할 시
//    void addMember(Long teamId, User user, String msg);

    List<TeamUser> getMemberByTeamId(Long teamId);

    void deleteMember(Long userId);

    int modifyGrade(Long userId);

    Team getTeamByTeamName(String teamName);

    Team getTeamInfoByTeamId(Long teamId);
}
