package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Board;
import com.ssafy.ododok.db.model.Comment;
import com.ssafy.ododok.db.model.Team;
import com.ssafy.ododok.db.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    void deleteAllByBoard_BoardId(Long boardId);

    List<Comment> findAllByBoard_BoardId(Long boardId);
    void deleteAllByUser(User user);
}
