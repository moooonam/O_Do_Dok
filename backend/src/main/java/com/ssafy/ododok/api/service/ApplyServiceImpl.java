package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.UserApplyPostReq;
import com.ssafy.ododok.api.response.ApplyRes;
import com.ssafy.ododok.db.model.*;
import com.ssafy.ododok.db.repository.ApplyRepository;
import com.ssafy.ododok.db.repository.TeamRepository;
import com.ssafy.ododok.db.repository.TeamUserRepository;
import com.ssafy.ododok.db.repository.UserSurveyRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.ssafy.ododok.db.model.Role.USER;

@Service
public class ApplyServiceImpl implements ApplyService {

    private final ApplyRepository applyRepository;
    private final TeamRepository teamRepository;
    private final TeamUserRepository teamUserRepository;
    private final UserSurveyRepository userSurveyRepository;

    public ApplyServiceImpl(ApplyRepository applyRepository, TeamRepository teamRepository, TeamUserRepository teamUserRepository, UserSurveyRepository userSurveyRepository) {
        this.applyRepository = applyRepository;
        this.teamRepository = teamRepository;
        this.teamUserRepository = teamUserRepository;
        this.userSurveyRepository = userSurveyRepository;
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
    public List<ApplyRes> getApplyMember(Long teamId) {
        List<Apply> applyList = applyRepository.findMemberByTeam_TeamId(teamId);

        List<ApplyRes> list = new ArrayList<>();
        for(int i=0; i<applyList.size(); i++){
            Long applyId = applyList.get(i).getApplyId();
            String nickname = applyList.get(i).getUser().getUserNickname();
            String msg = applyList.get(i).getApplyMsg();
            LocalDate date = applyList.get(i).getApplyDate();
            String img = applyList.get(i).getUser().getUserImage();
            ApplyRes applyRes = new ApplyRes(applyId, nickname, msg, date, img);

            list.add(applyRes);
        }
        return list;
    }

    @Override
    public void addMember(Long applyId) {
        Apply apply = applyRepository.findById(applyId).get();
        User user = apply.getUser();
        Team team = apply.getTeam();

        TeamUser teamUser = TeamUser.builder()
                .user(user)
                .team(team)
                .role(USER)
                .joinDate(LocalDate.now())
                .build();

        teamUserRepository.save(teamUser);

        Team updateTeam = teamRepository.findByTeamId(team.getTeamId()).get();
        updateTeam.setTeamMemberCnt(updateTeam.getTeamMemberCnt()+1);
        teamRepository.save(updateTeam);

        double x = team.getTeamAge();
        System.out.println("x ? : "+x);
        double y = team.getTeamMemberCnt()-1;
        System.out.println("y ? : "+y);
        double z = ((x * y) + (double) userSurveyRepository.findByUser(user).getUserAge()) / (y+1);
        System.out.println("z ? : "+z);
        updateTeam.setTeamAge(z);
        teamRepository.save(updateTeam);

//        int age = 0;
//        Long teamId = updateTeam.getTeamId();
//        List<TeamUser> teamUserList = teamUserRepository.findTeamUsersByTeam_TeamId(teamId);
//        for(int i=0; i<teamUserList.size(); i++){
//            System.out.println("¾ß..?");
//            TeamUser tu = teamUserList.get(i);
//            User u = tu.getUser();
//            UserSurvey us = userSurveyRepository.findByUser(u);
//            age += us.getUserAge();
//        }
//        double avg = age / updateTeam.getTeamMemberCnt();
//        System.out.println("avg : " + avg);
//        updateTeam.setTeamAge(avg);
//        teamRepository.save(updateTeam);
    }

    @Override
    public void deleteApplyMember(Long applyId) {
        applyRepository.deleteById(applyId);
    }


}
