package com.ssafy.ododok.api.request;

import com.ssafy.ododok.db.model.BoardType;
import lombok.Getter;

@Getter
public class CommentCreatePostReq {
    Long boardId;
    String comment;
}
