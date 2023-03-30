package com.ssafy.ododok.api.response;

import com.ssafy.ododok.db.model.Board;
import com.ssafy.ododok.db.model.Comment;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class BoardRes {
    private Board board;
    private List<Comment> comments;

    @Builder
    public BoardRes(Board board, List<Comment> comments){
        this.board = board;
        this.comments = comments;
    }
}
