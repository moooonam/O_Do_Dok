package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    List<Team> findByTeamNameContaining(String teamName);

    @Transactional
    @Modifying // select 문이 아님을 나타낸다
    @Query("UPDATE Team set isOngoingDodok = :is_ongoing_dodok where teamId = :team_id")
    void updateIsOngoingDodok(@Param("is_ongoing_dodok")boolean is_ongoing_dodok, @Param("team_id")Long team_id) throws Exception;

}
