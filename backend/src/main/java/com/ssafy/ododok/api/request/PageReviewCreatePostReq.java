package com.ssafy.ododok.api.request;

import lombok.Data;

@Data
public class PageReviewCreatePostReq {
    Long dodokId;
    int page;
    String content;
}
