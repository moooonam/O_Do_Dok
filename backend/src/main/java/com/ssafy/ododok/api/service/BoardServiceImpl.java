package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.BoardCreatePostReq;
import com.ssafy.ododok.api.request.CommentCreatePostReq;
import com.ssafy.ododok.api.response.BoardRes;
import com.ssafy.ododok.db.model.*;
import com.ssafy.ododok.db.repository.BoardRepository;
import com.ssafy.ododok.db.repository.CommentRepository;
import com.ssafy.ododok.db.repository.TeamUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.ododok.db.model.BoardType.free;
import static com.ssafy.ododok.db.model.BoardType.notice;

@Service
public class BoardServiceImpl implements BoardService{
    private final BoardRepository boardRepository;
    private final TeamUserRepository teamUserRepository;
    private final CommentRepository commentRepository;

    public BoardServiceImpl(BoardRepository boardRepository, TeamUserRepository teamUserRepository, CommentRepository commentRepository) {
        this.boardRepository = boardRepository;
        this.teamUserRepository = teamUserRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public Board createWriting(BoardCreatePostReq boardCreatePostReq, User user) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        Board board = Board.builder()
                .user(user)
                .team(team)
                .boardType(boardCreatePostReq.getBoardType())
                .boardTitle(boardCreatePostReq.getTitle())
                .boardContent(boardCreatePostReq.getContent())
                .boardDate(LocalDate.now())
                .build();
        return boardRepository.save(board);
    }

    @Override
    public List<Board> getAllWritings(User user) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        List<Board> list = boardRepository.findAllByTeam(team);
        return list;
    }

    @Override
    public List<Board> getNoticeWritings(User user) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        List<Board> notice_list = boardRepository.findAllByTeamAndBoardType(team, notice);
        return notice_list;
    }

    @Override
    public List<Board> getFreeWritings(User user) {
        TeamUser teamUser = teamUserRepository.findByUser(user);
        Team team = teamUser.getTeam();
        List<Board> free_list = boardRepository.findAllByTeamAndBoardType(team, free);
        return free_list;
    }

    @Override
    public String modifyWriting(Long boardId, BoardCreatePostReq boardCreatePostReq, User user) {
        Board board = boardRepository.findById(boardId).get();
        System.out.println(board.getUser().getUserId());
        System.out.println(user.getUserId());
        if(board.getUser().getUserId() == user.getUserId()){
            board.changeTitle(boardCreatePostReq.getTitle());
            board.changeContent(boardCreatePostReq.getContent());
            boardRepository.save(board);
            return "수정 되었습니다.";
        } else {
            return "권한이 없습니다.";
        }
    }

    @Transactional
    @Override
    public String deleteWriting(Long boardId, User user) {
        Board board = boardRepository.findById(boardId).get();

        if(board.getUser().getUserId() == user.getUserId()){
            System.out.println("1");
            commentRepository.deleteAllByBoard_BoardId(boardId);
            System.out.println("2");
            boardRepository.deleteById(boardId);
            return "삭제 성공";
        } else {
            return "권한 없음";
        }
    }

    @Override
    public BoardRes getWriting(Long boardId) {
        Board board = boardRepository.findById(boardId).get();
        List<Comment> comments = commentRepository.findAllByBoard_BoardId(boardId);
        BoardRes boardRes = BoardRes.builder()
                .board(board)
                .comments(comments)
                .build();
        return boardRes;
    }

    @Override
    public void createComment(CommentCreatePostReq commentCreatePostReq, User user) {
        Board board = boardRepository.findByBoardId(commentCreatePostReq.getBoardId());
        Comment comment = Comment.builder()
                .board(board)
                .user(user)
                .commentContent(commentCreatePostReq.getComment())
                .commentDate(LocalDate.now())
                .build();
        commentRepository.save(comment);
    }

    @Override
    public String modifyComment(CommentCreatePostReq commentCreatePostReq, User user) {

        Comment comment = commentRepository.findById(commentCreatePostReq.getBoardId()).get();

        if(comment.getUser().getUserId() == user.getUserId()){
            comment.changeComment(commentCreatePostReq.getComment());
            commentRepository.save(comment);
            return "수정 되었습니다.";
        } else {
            return "권한이 없습니다.";
        }
    }

    @Override
    public String deleteComment(Long commentId, User user) {
        Comment comment = commentRepository.findById(commentId).get();

        if(comment.getUser().getUserId() == user.getUserId()){
            commentRepository.deleteById(commentId);
            return "삭제 성공";
        } else {
            return "권한 없음";
        }
    }


}
