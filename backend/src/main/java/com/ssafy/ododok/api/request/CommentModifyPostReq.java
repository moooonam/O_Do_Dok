package com.ssafy.ododok.api.request;

import lombok.Getter;

@Getter
public class CommentModifyPostReq {
    Long commentId;
    String comment;
}
