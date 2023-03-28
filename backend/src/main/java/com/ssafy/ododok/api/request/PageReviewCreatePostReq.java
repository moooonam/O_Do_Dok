package com.ssafy.ododok.api.request;

import lombok.Data;
import lombok.Getter;

@Getter
public class PageReviewCreatePostReq {
    int page;
    String content;
}
