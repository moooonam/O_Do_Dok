package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.TeamCreatePostReq;
import com.ssafy.ododok.api.request.TeamModifyPatchReq;
import com.ssafy.ododok.api.service.TeamService;
import com.ssafy.ododok.common.auth.PrincipalDetails;
import com.ssafy.ododok.db.model.Role;
import com.ssafy.ododok.db.model.Team;
import com.ssafy.ododok.db.model.TeamUser;
import com.ssafy.ododok.db.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    // 모임 생성
    @PostMapping()
    public ResponseEntity<?> createTeam(@RequestBody TeamCreatePostReq teamCreatePostReq, Authentication authentication){
        // 본인도 모임에 멤버로 추가되어야 함
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        System.out.println("user : " + user);

        teamService.createTeam(teamCreatePostReq, user);
        return ResponseEntity.status(200).body("완료");
    }

    // 모임 리스트 출력
    @GetMapping()
    public ResponseEntity<List<Team>> getAllTeams(){
        List<Team> teamList = teamService.getAllTeams();
        return ResponseEntity.status(200).body(teamList);
    }

    // 모임 이름으로 검색
    @GetMapping("/{teamName}")
    public ResponseEntity<List<Team>> getTeamInfoByTeamName(@PathVariable String teamName){
        List<Team> teamList = teamService.getTeamInfoByTeamName(teamName);
        return ResponseEntity.status(200).body(teamList);
    }

    // 모임 정보 수정
    @PatchMapping("/{teamId}")
    public ResponseEntity<?> modifyTeamInfo(@PathVariable Long teamId, @RequestBody TeamModifyPatchReq teamModifyPatchReq){
        teamService.modifyTeam(teamId, teamModifyPatchReq);
        return ResponseEntity.status(200).body("팀 수정 성공!");
    }

    // 모임 삭제 - 모임ID값 이용
    @DeleteMapping("/{teamId}")
    public ResponseEntity<?> deleteTeam(@PathVariable Long teamId){
        teamService.deleteTeam(teamId);
        return ResponseEntity.status(200).body("팀 삭제 성공!");
    }

    // 모임 신청 -> 모임에 멤버 추가
    @PostMapping("/{teamId}")
    public ResponseEntity<String> addMember(@PathVariable Long teamId, @RequestBody String msg, Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        teamService.addMember(teamId, user, msg);
        return ResponseEntity.status(200).body("완료!");
    }

    // 모임 구성원 출력
    @GetMapping("/member/{teamId}")
    public ResponseEntity<List<TeamUser>> showMember(@PathVariable Long teamId){
        List<TeamUser> memberList = teamService.getMemberByTeamId(teamId);
        return ResponseEntity.status(200).body(memberList);
    }

    // 모임의 구성원 삭제
    @DeleteMapping("/member/{userId}")
    public ResponseEntity<?> deleteMember(@PathVariable Long userId){
        teamService.deleteMember(userId);
        return ResponseEntity.status(200).body("멤버 삭제 성공!");
    }

    // 모임 구성원 관리자로 등급 업 or 일반 유저로 등급 다운
    @PatchMapping("/member/{userId}")
    public ResponseEntity<?> modifyGrade(@PathVariable Long userId){
        int check = teamService.modifyGrade(userId);

        if(check == 1) return ResponseEntity.status(200).body("관리자로 변경 성공!");
        else return ResponseEntity.status(200).body("일반 사용자로 변경 성공!");
//        else return ResponseEntity.status(200).body("모임장은 변경 불가능");
    }

}
