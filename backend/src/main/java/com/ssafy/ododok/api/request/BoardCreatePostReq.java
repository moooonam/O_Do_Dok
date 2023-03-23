package com.ssafy.ododok.api.request;

import com.ssafy.ododok.db.model.BoardType;
import lombok.Getter;
import lombok.Setter;

@Getter
public class BoardCreatePostReq {
    private BoardType boardType;
    private String title;
    private String content;
}
