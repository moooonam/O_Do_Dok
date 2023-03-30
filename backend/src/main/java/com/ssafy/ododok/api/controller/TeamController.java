package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.TeamCreatePostReq;
import com.ssafy.ododok.api.request.TeamModifyPatchReq;
import com.ssafy.ododok.api.request.UserAcceptPostReq;
import com.ssafy.ododok.api.request.UserApplyPostReq;
import com.ssafy.ododok.api.response.ApplyRes;
import com.ssafy.ododok.api.service.ApplyService;
import com.ssafy.ododok.api.service.TeamService;
import com.ssafy.ododok.common.auth.PrincipalDetails;
import com.ssafy.ododok.db.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/teams")
public class TeamController {

    private final TeamService teamService;
    private final ApplyService applyService;


    public TeamController(TeamService teamService, ApplyService applyService) {
        this.teamService = teamService;
        this.applyService = applyService;
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

    // 모임이름 중복확인
    @GetMapping("/check/{teamName}")
    public ResponseEntity<Boolean> checkTeamName(@PathVariable String teamName) {
        try{
            teamService.getTeamByTeamName(teamName);
        } catch(NoSuchElementException e){
            return ResponseEntity.status(200).body(true);
        }
        return ResponseEntity.status(200).body(false);
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

    // 모임 정보 출력
    @GetMapping("/info/{teamId}")
    public ResponseEntity<Team> getTeamInfoByTeamId(@PathVariable Long teamId){
        try{
            Team team = teamService.getTeamInfoByTeamId(teamId);
            return ResponseEntity.status(200).body(team);
        } catch(NoSuchElementException e){
            return ResponseEntity.status(200).body(null);
        }
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

    // 모임 가입 신청하기
    @PostMapping("/apply")
    public ResponseEntity<?> applyTeam(@RequestBody UserApplyPostReq userApplyPostReq, Authentication authentication){
        // 이미 모임 신청을 한 유저라면 신청 안됨
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        // apply 테이블에 신청여부 확인
        if(applyService.getUserByUserId(user.getUserId())) {
            // 있다면 신청 실패
            System.out.println("이미 신청한 유저입니다. 신청 불가");
            return ResponseEntity.status(200).body("이미 신청한 유저입니다. 신청 불가");
        }
        // 이미 팀에 속해있어도 신청 실패 -> TeamUser 테이블 확인
        if(applyService.getUserHaveTeam(user.getUserId())) {
            System.out.println("팀에 이미 속해있습니다. 신청 불가");
            return ResponseEntity.status(200).body("팀에 이미 속해있습니다. 신청 불가");
        }

        else {
            // 없다면 신청 가능
            applyService.setUserApply(userApplyPostReq, user);
            return ResponseEntity.status(200).body("신청 성공");
        }
    }

    // 모임 신청자 리스트 출력
    @GetMapping("/apply/{teamId}")
    public ResponseEntity<?> applyMember(@PathVariable Long teamId){
        List<ApplyRes> list = applyService.getApplyMember(teamId);
        return ResponseEntity.status(200).body(list);
    }

    // 모임 신청자 수락/거절
    @PostMapping("/accept")
    public ResponseEntity<?> acceptMember(@RequestBody UserAcceptPostReq userAcceptPostReq){
        if (userAcceptPostReq.getIsAccept()){
            // 수락을 함 -> 팀 멤버에 추가
            applyService.addMember(userAcceptPostReq.getApplyId());
            System.out.println("추가 완료");
        }

        // 지원자 목록에서 제거
        applyService.deleteApplyMember(userAcceptPostReq.getApplyId());
        
        return ResponseEntity.status(200).body("처리 완료");
    }

    // 모임 신청 -> 모임에 멤버 추가
//    @PostMapping("/{teamId}")
//    public ResponseEntity<String> addMember(@PathVariable Long teamId, @RequestBody String msg, Authentication authentication){
//        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
//        User user = principal.getUser();
//        teamService.addMember(teamId, user, msg);
//        return ResponseEntity.status(200).body("완료!");
//    }

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
