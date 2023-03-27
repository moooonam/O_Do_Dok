package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.UserApplyPostReq;
import com.ssafy.ododok.db.model.Apply;
import com.ssafy.ododok.db.model.Team;
import com.ssafy.ododok.db.model.TeamUser;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.repository.ApplyRepository;
import com.ssafy.ododok.db.repository.TeamRepository;
import com.ssafy.ododok.db.repository.TeamUserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ApplyServiceImpl implements ApplyService {

    private final ApplyRepository applyRepository;
    private final TeamRepository teamRepository;
    private final TeamUserRepository teamUserRepository;

    public ApplyServiceImpl(ApplyRepository applyRepository, TeamRepository teamRepository, TeamUserRepository teamUserRepository) {
        this.applyRepository = applyRepository;
        this.teamRepository = teamRepository;
        this.teamUserRepository = teamUserRepository;
    }

    @Override
    public boolean getUserByUserId(Long userId) {
        Apply apply = applyRepository.findApplyByUser_UserId(userId);
        if(apply != null) return true;
        else return false;
    }

    @Override
    public boolean getUserHaveTeam(Long userId) {
        TeamUser teamUser = teamUserRepository.findTeamUserByUser_UserId(userId);
        if(teamUser != null) return true;
        else return false;
    }

    @Override
    public void setUserApply(UserApplyPostReq userApplyPostReq, User user) {
        Optional<Team> oTeam = teamRepository.findById(userApplyPostReq.getTeamId());
        Team team = oTeam.get();

        Apply apply = Apply.builder()
                .applyMsg(userApplyPostReq.getApplyMsg())
                .user(user)
                .team(team)
                .applyDate(LocalDate.now())
                .build();

        applyRepository.save(apply);
    }

    @Override
    public List<Apply> getApplyMember(Long teamId) {
        List<Apply> applyList = applyRepository.findMemberByTeam_TeamId(teamId);
        return applyList;
    }

    @Override
    public void addMember(Long applyId) {
        Apply apply = applyRepository.findById(applyId).get();
        User user = apply.getUser();
        Team team = apply.getTeam();

        TeamUser teamUser = TeamUser.builder()
                .user(user)
                .team(team)
                .joinDate(LocalDate.now())
                .build();

        teamUserRepository.save(teamUser);
//public void changeNickName(String nickname){
//        this.userNickname = nickname;
//    }
        // 추가되면 팀 인원 +1
        Team updateTeam = teamRepository.findByTeamId(team.getTeamId()).get();
        updateTeam.setTeamMemberCnt(updateTeam.getTeamMemberCnt()+1);
        teamRepository.save(updateTeam);
    }

    @Override
    public void deleteApplyMember(Long applyId) {
        applyRepository.deleteById(applyId);
    }


}
