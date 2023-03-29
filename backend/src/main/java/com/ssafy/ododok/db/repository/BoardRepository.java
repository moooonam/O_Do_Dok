package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Board;
import com.ssafy.ododok.db.model.BoardType;
import com.ssafy.ododok.db.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findAllByTeamAndBoardType(Team team, BoardType type);
    List<Board> findAllByTeam(Team team);
    Board findByBoardId(Long BoardId);
}
