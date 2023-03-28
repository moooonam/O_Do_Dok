package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.BoardCreatePostReq;
import com.ssafy.ododok.db.model.Board;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.repository.BoardRepository;
import com.ssafy.ododok.db.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService{
    private final BoardRepository boardRepository;

    public BoardServiceImpl(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Override
    public Board createWriting(BoardCreatePostReq boardCreatePostReq) {
        Board board = Board.builder()
                .boardType(boardCreatePostReq.getBoardType())
                .boardTitle(boardCreatePostReq.getTitle())
                .boardContent(boardCreatePostReq.getContent())
                .boardDate(LocalDate.now())
                .build();
        return boardRepository.save(board);
    }

    @Override
    public List<Board> getAllWritings() {
        return boardRepository.findAll();
    }

    @Override
    public List<Board> getNoticeWritings() {
        return boardRepository.findByBoardType_BoardType("notice");
    }

    @Override
    public List<Board> getFreeWritings() {
        return boardRepository.findByBoardType_BoardType("free");
    }

    @Override
    public Board modifyWriting(Long boardId, BoardCreatePostReq boardCreatePostReq) {
        Board board = boardRepository.findById(boardId).get();
        board.changeTitle(boardCreatePostReq.getTitle());
        board.changeContent(boardCreatePostReq.getContent());
        return boardRepository.save(board);
    }

    @Override
    public void deleteWriting(Long boardId) {
        boardRepository.deleteById(boardId);
    }
}
