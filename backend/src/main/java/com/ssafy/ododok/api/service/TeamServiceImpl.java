package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.TeamCreatePostReq;
import com.ssafy.ododok.api.request.TeamModifyPatchReq;
import com.ssafy.ododok.db.model.Team;
import com.ssafy.ododok.db.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamServiceImpl implements TeamService{


    private final TeamRepository teamRepository;

    public TeamServiceImpl(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public Team createTeam(TeamCreatePostReq teamCreatePostReq) {
        Team team = new Team();
        team.setTeamName(teamCreatePostReq.getTeamName());
        team.setTeamMemberCntMax(teamCreatePostReq.getTeamMemberCntMax());
        team.setTeamOnoff(teamCreatePostReq.getTeamOnoff());
        team.setTeamRegion(teamCreatePostReq.getTeamRegion());
        team.setTeamGenre1(teamCreatePostReq.getTeamGenre1());
        team.setTeamGenre2(teamCreatePostReq.getTeamGenre2());
        team.setTeamGenre3(teamCreatePostReq.getTeamGenre3());
        return teamRepository.save(team);
    }

    public List<Team> getAllTeams(){
        return teamRepository.findAll();
    }

    @Override
    public List<Team> getTeamInfoByTeamName(String teamName) {
        List<Team> list = teamRepository.findByTeamNameContaining(teamName);
        return list;
    }

    @Override
    public Team modifyTeam(Long teamId, TeamModifyPatchReq teamModifyPatchReq) {
        Optional<Team> oTeam = teamRepository.findById(teamId);

        Team team = oTeam.get();

        team.setTeamMemberCntMax(teamModifyPatchReq.getTeamMemberCntMax());
        team.setTeamOnoff(teamModifyPatchReq.getTeamOnoff());
        team.setTeamRegion(teamModifyPatchReq.getTeamRegion());
        team.setTeamGenre1(teamModifyPatchReq.getTeamGenre1());
        team.setTeamGenre2(teamModifyPatchReq.getTeamGenre2());
        team.setTeamGenre3(teamModifyPatchReq.getTeamGenre3());
        team.setTeamRecruit(teamModifyPatchReq.isTeamRecruit());

        return teamRepository.save(team);
    }

    @Override
    public void deleteTeam(Long teamId) {
        teamRepository.deleteById(teamId);
    }
}
