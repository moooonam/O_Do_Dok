package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Board;
import com.ssafy.ododok.db.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    void deleteAllByBoard_BoardId(Long boardId);
}
