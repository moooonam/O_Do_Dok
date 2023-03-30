package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    List<Team> findByTeamNameContaining(String teamName);
    Optional<Team> findByTeamName(String teamName);
    Optional<Team> findByTeamId(Long teamId);
}
