package com.ssafy.ododok.api.request;

import lombok.Data;
import lombok.Getter;

@Getter
public class EndReviewCreatePostReq {
    String content;
    double bookRating;
    double genreRating;
}
