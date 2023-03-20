package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.TeamCreatePostReq;
import com.ssafy.ododok.api.request.TeamModifyPatchReq;
import com.ssafy.ododok.db.model.Role;
import com.ssafy.ododok.db.model.Team;
import com.ssafy.ododok.db.model.TeamUser;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.repository.TeamRepository;
import com.ssafy.ododok.db.repository.TeamUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamServiceImpl implements TeamService{

    private final TeamRepository teamRepository;
    private final TeamUserRepository teamUserRepository;

    public TeamServiceImpl(TeamRepository teamRepository, TeamUserRepository teamUserRepository) {
        this.teamRepository = teamRepository;
        this.teamUserRepository = teamUserRepository;
    }

    // 팀 생성
    @Override
    public void createTeam(TeamCreatePostReq teamCreatePostReq, User user) {
        Team team = Team.builder()
                .teamName(teamCreatePostReq.getTeamName())
                .teamMemberCntMax(teamCreatePostReq.getTeamMemberCntMax())
                .teamOnoff(teamCreatePostReq.getTeamOnoff())
                .teamRegion(teamCreatePostReq.getTeamRegion())
                .teamGenre1(teamCreatePostReq.getTeamGenre1())
                .teamGenre2(teamCreatePostReq.getTeamGenre2())
                .teamGenre3(teamCreatePostReq.getTeamGenre3())
                .teamRecruit(true)
                .build();
        teamRepository.save(team);

        // 자기 자신 팀에 추가
        addAdmin(team.getTeamId(), user);
    }

    // 모든 팀 조회
    public List<Team> getAllTeams(){
        return teamRepository.findAll();
    }

    // 팀 이름으로 조회
    @Override
    public List<Team> getTeamInfoByTeamName(String teamName) {
        List<Team> list = teamRepository.findByTeamNameContaining(teamName);
        return list;
    }

    // 팀 정보 수정
    @Override
    public Team modifyTeam(Long teamId, TeamModifyPatchReq teamModifyPatchReq) {
        Optional<Team> oTeam = teamRepository.findById(teamId);

        Team team = oTeam.get();

        // Team 수정
        team.updateTeam(teamModifyPatchReq);

        return teamRepository.save(team);
    }

    // 팀 삭제
    @Override
    public void deleteTeam(Long teamId) {
        // teamUser 먼저 삭제
        teamUserRepository.deleteById(teamId);
        // team 삭제
        teamRepository.deleteById(teamId);
    }

    // 팀을 만들 때 - ADMIN으로 지정
    @Override
    public void addAdmin(Long teamId, User user) {

        Optional<Team> oTeam = teamRepository.findById(teamId);
        Team team = oTeam.get();

        TeamUser teamUser = TeamUser.builder()
                .team(team)
                .user(user)
                .role(Role.ADMIN)
                .build();

        System.out.println("teamUser = " + teamUser);
        teamUserRepository.save(teamUser);
    }

    // 멤버 초대할 시 - USER로 지정
    @Override
    public void addMember(Long teamId, User user) {

        Optional<Team> oTeam = teamRepository.findById(teamId);
        Team team = oTeam.get();

        TeamUser teamUser = TeamUser.builder()
                .team(team)
                .user(user)
                .role(Role.USER)
                .build();

        System.out.println("teamUser = " + teamUser);
        teamUserRepository.save(teamUser);
    }

    // 팀ID로 팀 멤버 조회
    @Override
    public Optional<TeamUser> getMemberByTeamId(Long teamId) {
        return teamUserRepository.findById(teamId);
    }

}
