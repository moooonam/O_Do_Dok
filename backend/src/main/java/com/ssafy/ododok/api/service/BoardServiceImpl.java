package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.BoardCreatePostReq;
import com.ssafy.ododok.db.model.Board;
import com.ssafy.ododok.db.model.Team;
import com.ssafy.ododok.db.model.TeamUser;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.repository.BoardRepository;
import com.ssafy.ododok.db.repository.TeamUserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.ododok.db.model.BoardType.free;
import static com.ssafy.ododok.db.model.BoardType.notice;

@Service
public class BoardServiceImpl implements BoardService{
    private final BoardRepository boardRepository;
    private final TeamUserRepository teamUserRepository;

    public BoardServiceImpl(BoardRepository boardRepository, TeamUserRepository teamUserRepository) {
        this.boardRepository = boardRepository;
        this.teamUserRepository = teamUserRepository;
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

    @Override
    public String deleteWriting(Long boardId, User user) {
        Board board = boardRepository.findById(boardId).get();

        if(board.getUser().getUserId() == user.getUserId()){
            boardRepository.deleteById(boardId);
            return "삭제 성공";
        } else {
            return "권한 없음";
        }
    }
}
