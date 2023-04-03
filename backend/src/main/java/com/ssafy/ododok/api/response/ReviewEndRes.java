package com.ssafy.ododok.api.response;

import com.ssafy.ododok.db.model.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ReviewEndRes {

    long reviewEndId;
    User user;
    String reviewEndContent;
    LocalDate reviewEndDate;
    double reviewEndBookrating;
    double reviewEndGenrerating;

    @Builder
    public ReviewEndRes(long reviewEndId, User user,
                        String reviewEndContent, LocalDate reviewEndDate,
                        double reviewEndBookrating, double reviewEndGenrerating){
        this.reviewEndId = reviewEndId;
        this.user = user;
        this.reviewEndContent = reviewEndContent;
        this.reviewEndDate = reviewEndDate;
        this.reviewEndBookrating = reviewEndBookrating;
        this.reviewEndGenrerating = reviewEndGenrerating;
    }
}
