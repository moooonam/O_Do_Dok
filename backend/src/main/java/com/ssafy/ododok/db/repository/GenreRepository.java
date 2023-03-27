package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {

    Genre save(Genre genre);
}
