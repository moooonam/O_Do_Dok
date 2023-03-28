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

import static com.ssafy.ododok.db.model.Role.MANAGER;
import static com.ssafy.ododok.db.model.Role.USER;

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

        // 팀에 속해있다면 팀 생성 불가
        if(teamUserRepository.findByUser(user) != null) {
            System.out.println("팀 생성 불가");
            return;
        }

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
        System.out.println("팀 생성 성공");
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

    // 팀 신청 / 멤버 초대할 시 - USER로 지정
    @Override
    public void addMember(Long teamId, User user, String msg) {

        // 팀에 속해있다면 팀 신청 불가
        if(teamUserRepository.findByUser(user) != null) {
            System.out.println("팀 가입 불가");
            return;
        }

        Optional<Team> oTeam = teamRepository.findById(teamId);
        Team team = oTeam.get();

        TeamUser teamUser = TeamUser.builder()
                .team(team)
                .user(user)
                .role(USER)
                .build();

        System.out.println("teamUser = " + teamUser);
        teamUserRepository.save(teamUser);
        System.out.println("팀 가입 성공");
    }

    // 팀ID로 팀 멤버 조회
    @Override
    public List<TeamUser> getMemberByTeamId(Long teamId) {
        List<TeamUser> teamUserList = teamUserRepository.findTeamUsersByTeam_TeamId(teamId);
        return teamUserList;
    }

    // 모임의 구성원 삭제
    @Override
    public void deleteMember(Long userId) {
        // 인원 감소시킬 팀 테이블 찾기
        TeamUser teamUser = teamUserRepository.findByUser_UserId(userId);
        Team team = teamUser.getTeam();

        // 테이블에서 멤버 삭제
        teamUserRepository.deleteById(userId);

        // 삭제되면 팀 인원 -1
        Team updateTeam = teamRepository.findByTeamId(team.getTeamId()).get();
        updateTeam.setTeamMemberCnt(updateTeam.getTeamMemberCnt()-1);
        teamRepository.save(updateTeam);
    }

    // 모임 구성원 직책 변경
    @Override
    public int modifyGrade(Long userId) {
        Optional<TeamUser> oTeamUser = teamUserRepository.findById(userId);
        TeamUser teamUser = oTeamUser.get();

        // 관리자로 변경하면 1 일반 유저로 변경하면 0
        if(teamUser.getRole().equals(USER)) {
            teamUser.changeRole(MANAGER);
            teamUserRepository.save(teamUser);
            return 1;
        }

        if (teamUser.getRole().equals(MANAGER)){
            teamUser.changeRole(USER);
            teamUserRepository.save(teamUser);
            return 2;
        }

        return 0;
    }

    @Override
    public Team getTeamByTeamName(String teamName) {
        Team team = teamRepository.findByTeamName(teamName).get();
        return team;
    }

    @Override
    public Team getTeamInfoByTeamId(Long teamId) {
        Team team = teamRepository.findByTeamId(teamId).get();
        return team;
    }

}
