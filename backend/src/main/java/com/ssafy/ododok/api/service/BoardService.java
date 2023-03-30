package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.BoardCreatePostReq;
import com.ssafy.ododok.api.request.CommentCreatePostReq;
import com.ssafy.ododok.api.response.BoardRes;
import com.ssafy.ododok.db.model.Board;
import com.ssafy.ododok.db.model.User;

import java.util.List;

public interface BoardService {
    Board createWriting(BoardCreatePostReq boardCreatePostReq, User user);

    List<Board> getAllWritings(User user);

    List<Board> getNoticeWritings(User user);

    List<Board> getFreeWritings(User user);

    String modifyWriting(Long boardId, BoardCreatePostReq boardCreatePostReq, User user);

    String deleteWriting(Long boardId, User user);

    BoardRes getWriting(Long boardId);

    void createComment(CommentCreatePostReq commentCreatePostReq, User user);

    String modifyComment(CommentCreatePostReq commentCreatePostReq, User user);

    String deleteComment(Long commentId, User user);
}
