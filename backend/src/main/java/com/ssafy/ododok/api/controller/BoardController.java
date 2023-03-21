package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.BoardCreatePostReq;
import com.ssafy.ododok.api.service.BoardService;
import com.ssafy.ododok.db.model.Board;
import com.ssafy.ododok.db.model.BoardType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    // 게시판 글 생성
    @PostMapping()
    public ResponseEntity<?> createWriting(@RequestBody BoardCreatePostReq boardCreatePostReq){
        boardService.createWriting(boardCreatePostReq);
        return ResponseEntity.status(200).body("게시글 작성 성공");
    }

    // 게시판 글 전체 조회
    @GetMapping()
    public ResponseEntity<?> getAllWritings(){
        List<Board> writingList = boardService.getAllWritings();
        return ResponseEntity.status(200).body(writingList);
    }

    // 게시판 공지사항 조회
    @GetMapping("/notice")
    public ResponseEntity<?> getNoticeWritings(){
        List<Board> writingList = boardService.getNoticeWritings();
        return ResponseEntity.status(200).body(writingList);
    }

    // 게시판 자유게시글 조회
    @GetMapping("/free")
    public ResponseEntity<?> getFreeWritings(){

        List<Board> writingList = boardService.getFreeWritings();
        return ResponseEntity.status(200).body(writingList);
    }

    // 게시판 글 수정
    @PutMapping("/{boardId}")
    public ResponseEntity<?> modifyWriting(@PathVariable Long boardId, @RequestBody BoardCreatePostReq boardCreatePostReq){
        boardService.modifyWriting(boardId, boardCreatePostReq);
        return ResponseEntity.status(200).body("게시글 수정 성공");
    }

    // 게시판 글 삭제
    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteWriting(@PathVariable Long boardId){
        boardService.deleteWriting(boardId);
        return ResponseEntity.status(200).body("게시글 삭제 성공");
    }
}
