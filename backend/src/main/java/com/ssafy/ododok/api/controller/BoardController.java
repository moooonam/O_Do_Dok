package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.BoardCreatePostReq;
import com.ssafy.ododok.api.request.CommentCreatePostReq;
import com.ssafy.ododok.api.response.BoardRes;
import com.ssafy.ododok.api.service.BoardService;
import com.ssafy.ododok.common.auth.PrincipalDetails;
import com.ssafy.ododok.db.model.Board;
import com.ssafy.ododok.db.model.BoardType;
import com.ssafy.ododok.db.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    // 게시판 글 생성
    @PostMapping()
    public ResponseEntity<?> createWriting(@RequestBody BoardCreatePostReq boardCreatePostReq, Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        boardService.createWriting(boardCreatePostReq, user);
        return ResponseEntity.status(200).body("게시글 작성 성공");
    }

    // 게시글 상세보기
    @GetMapping("/details/{boardId}")
    public ResponseEntity<?> getWritings(@PathVariable Long boardId){
        BoardRes boardRes = boardService.getWriting(boardId);
        return ResponseEntity.status(200).body(boardRes);
    }

    // 게시판 글 전체 조회
    @GetMapping()
    public ResponseEntity<?> getAllWritings(Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        List<Board> writingList = boardService.getAllWritings(user);
        return ResponseEntity.status(200).body(writingList);
    }

    // 게시판 공지사항 조회
    @GetMapping("/notice")
    public ResponseEntity<?> getNoticeWritings(Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        List<Board> writingList = boardService.getNoticeWritings(user);
        return ResponseEntity.status(200).body(writingList);
    }

    // 게시판 자유게시글 조회
    @GetMapping("/free")
    public ResponseEntity<?> getFreeWritings(Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        List<Board> writingList = boardService.getFreeWritings(user);
        return ResponseEntity.status(200).body(writingList);
    }

    // 게시판 글 수정
    @PutMapping("/{boardId}")
    public ResponseEntity<?> modifyWriting(@PathVariable Long boardId, @RequestBody BoardCreatePostReq boardCreatePostReq,
                                           Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        String res = boardService.modifyWriting(boardId, boardCreatePostReq, user);
        return ResponseEntity.status(200).body(res);
    }

    // 게시판 글 삭제
    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteWriting(@PathVariable Long boardId, Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        String res = boardService.deleteWriting(boardId, user);
        return ResponseEntity.status(200).body(res);
    }

    // 게시판 답글 생성
    @PostMapping("/comment")
    public ResponseEntity<?> createComment(@RequestBody CommentCreatePostReq commentCreatePostReq, Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        boardService.createComment(commentCreatePostReq, user);
        return ResponseEntity.status(200).body("답글 작성 성공");
    }

    // 게시판 답글 수정
    @PutMapping("/comment")
    public ResponseEntity<?> modifyComment(@RequestBody CommentCreatePostReq commentCreatePostReq,
                                           Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        String res = boardService.modifyComment(commentCreatePostReq, user);
        return ResponseEntity.status(200).body(res);
    }

    // 게시판 답글 삭제
    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId, Authentication auth){
        PrincipalDetails principal = (PrincipalDetails) auth.getPrincipal();
        User user = principal.getUser();
        String res = boardService.deleteComment(commentId, user);
        return ResponseEntity.status(200).body(res);
    }
}
