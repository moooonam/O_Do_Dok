package com.ssafy.ododok.api.request;

import lombok.Data;

@Data
public class EndReviewModifyPutReq {
    Long endReviewId;
    String content;
    double bookRating;
    double genreRating;
}
