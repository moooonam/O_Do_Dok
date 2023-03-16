package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.BoardCreatePostReq;
import com.ssafy.ododok.db.model.Board;

import java.util.List;

public interface BoardService {
    Board createWriting(BoardCreatePostReq boardCreatePostReq);

    List<Board> getAllWritings();

    List<Board> getNoticeWritings();

    List<Board> getFreeWritings();

    Board modifyWriting(Long boardId, BoardCreatePostReq boardCreatePostReq);

    void deleteWriting(Long boardId);
}
