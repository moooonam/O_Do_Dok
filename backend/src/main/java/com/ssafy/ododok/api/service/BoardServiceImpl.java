package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.BoardCreatePostReq;
import com.ssafy.ododok.db.model.Board;
import com.ssafy.ododok.db.repository.BoardRepository;
import com.ssafy.ododok.db.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService{
    private final BoardRepository boardRepository;

    private final UserRepository userRepository;

    public BoardServiceImpl(BoardRepository boardRepository, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Board createWriting(BoardCreatePostReq boardCreatePostReq) {
        Board board = new Board();

        // 유저정보 불러와야하나?
//        Optional<User> oUser = userRepository.findById(userId);
//        User user = oUser.get();

        board.setBoardType(boardCreatePostReq.getBoardType());
        board.setBoardTitle(boardCreatePostReq.getTitle());
        board.setBoardContent(boardCreatePostReq.getContent());
        board.setBoardDate(LocalDate.now());
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
        Optional<Board> oBoard = boardRepository.findById(boardId);
        Board board = oBoard.get();

        board.setBoardTitle(boardCreatePostReq.getTitle());
        board.setBoardContent(boardCreatePostReq.getContent());

        return boardRepository.save(board);
    }

    @Override
    public void deleteWriting(Long boardId) {
        boardRepository.deleteById(boardId);
    }
}
