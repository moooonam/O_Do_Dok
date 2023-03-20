package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
//    Team save(Team team);
    List<Team> findByTeamNameContaining(String teamName);

}
