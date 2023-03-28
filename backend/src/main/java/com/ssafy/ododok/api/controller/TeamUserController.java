package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.service.TeamUserService;
import com.ssafy.ododok.common.auth.PrincipalDetails;
import com.ssafy.ododok.db.model.Role;
import com.ssafy.ododok.db.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/teams/user")
public class TeamUserController {

    private final TeamUserService teamUserService;

    public TeamUserController(TeamUserService teamUserService) {
        this.teamUserService = teamUserService;
    }

    @GetMapping("/myRole")
    public ResponseEntity<?> showMyRole(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();
        Role role = teamUserService.getUserRole(user);
        return ResponseEntity.status(200).body(role);
    }



}
