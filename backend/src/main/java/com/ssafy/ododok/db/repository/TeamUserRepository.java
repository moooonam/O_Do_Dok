package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.TeamUser;
import com.ssafy.ododok.db.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TeamUserRepository extends JpaRepository<TeamUser,Long> {
    TeamUser findByUser(User user);

    List<TeamUser> findTeamUsersByTeam_TeamId(Long teamId);

    User getUserByUser_UserId(Long userId);

    TeamUser findTeamUserByUser_UserId(Long userId);

    TeamUser findByUser_UserId(Long userId);

    @Transactional
    void deleteByUser_UserId(Long userId);
}
