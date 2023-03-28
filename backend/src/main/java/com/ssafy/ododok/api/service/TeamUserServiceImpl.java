package com.ssafy.ododok.api.service;

import com.ssafy.ododok.db.model.Role;
import com.ssafy.ododok.db.model.TeamUser;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.repository.TeamUserRepository;
import org.springframework.stereotype.Service;

@Service
public class TeamUserServiceImpl implements TeamUserService{

    private final TeamUserRepository teamUserRepository;

    public TeamUserServiceImpl(TeamUserRepository teamUserRepository) {
        this.teamUserRepository = teamUserRepository;
    }

    @Override
    public Role getUserRole(User user) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Role myRole = teamUser.getRole();
        return myRole;
    }
}
