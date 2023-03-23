package com.ssafy.ododok.api.request;

import lombok.Data;

@Data
public class EndReviewCreatePostReq {
    String content;
    double bookRating;
    double genreRating;
}
