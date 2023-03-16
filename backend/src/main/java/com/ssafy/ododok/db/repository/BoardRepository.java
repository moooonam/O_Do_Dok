package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findByBoardType_BoardType(String type);
}
