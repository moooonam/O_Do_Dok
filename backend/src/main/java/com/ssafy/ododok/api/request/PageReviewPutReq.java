package com.ssafy.ododok.api.request;

import lombok.Data;

@Data
public class PageReviewPutReq {
    long reviewPageId;
    String content;
}
