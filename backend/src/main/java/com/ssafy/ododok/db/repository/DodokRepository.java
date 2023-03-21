package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Book;
import com.ssafy.ododok.db.model.Dodok;
import com.ssafy.ododok.db.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DodokRepository extends JpaRepository<Dodok,Long> {

    Optional<List<Dodok>> findAllByTeamAndDodokComplete(Team team,Boolean dodokComplete);

}
