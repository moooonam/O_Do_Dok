package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Dodok;
import com.ssafy.ododok.db.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface DodokRepository extends JpaRepository<Dodok,Long> {

    Optional<List<Dodok>> findAllByTeamAndDodokComplete(Team team, Boolean dodokComplete);
    Optional<Dodok> findByTeamAndDodokComplete(Team team, Boolean dodokComplete);
    Optional<List<Dodok>> findAllByTeamAndDodokCompleteAndDodokOpen(Team team, Boolean dodokComplete, Boolean dodokOpen);

    @Transactional
    @Modifying // select 문이 아님을 나타낸다
    @Query("UPDATE Dodok set dodokComplete = :dodok_complete where dodokId = :dodok_id")
    void updateDodokComplete(@Param("dodok_complete")boolean dodok_complete, @Param("dodok_id")Long dodok_id) throws Exception;


}
