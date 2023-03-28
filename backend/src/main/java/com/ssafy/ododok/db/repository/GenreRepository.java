package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Book;
import com.ssafy.ododok.db.model.Genre;
import com.ssafy.ododok.db.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GenreRepository extends JpaRepository<Genre, Long> {

    Genre save(Genre genre);
    List<Genre> findAllByTeam(Team team);

    Genre findTopByTeamOrderByRating(Team team);

    Genre findByTeamAndGenre(Team team, String genre);
}
