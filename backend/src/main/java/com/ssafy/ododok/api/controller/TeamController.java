package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.TeamCreatePostReq;
import com.ssafy.ododok.api.request.TeamModifyPatchReq;
import com.ssafy.ododok.api.service.TeamService;
import com.ssafy.ododok.db.model.Team;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    // 모임 생성
    @PostMapping()
    public ResponseEntity<?> createTeam(@RequestBody TeamCreatePostReq teamCreatePostReq){
        teamService.createTeam(teamCreatePostReq);
        return ResponseEntity.status(200).body("팀 생성 성공!");
    }

    // 모임 리스트 출력
    @GetMapping()
    public ResponseEntity<List<Team>> getAllTeams(){
        List<Team> teamList = teamService.getAllTeams();
        return ResponseEntity.status(200).body(teamList);
    }

    // 모임 이름으로 검색
    @GetMapping("/search/{teamName}")
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
}
