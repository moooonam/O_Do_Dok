package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.TeamUser;
import com.ssafy.ododok.db.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamUserRepository extends JpaRepository<TeamUser,Long> {
    TeamUser findByUser(User user);

    List<TeamUser> findTeamUsersByTeam_TeamId(Long teamId);



}
