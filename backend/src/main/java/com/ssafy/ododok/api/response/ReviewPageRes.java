package com.ssafy.ododok.api.response;

import com.ssafy.ododok.db.model.Board;
import com.ssafy.ododok.db.model.Comment;
import com.ssafy.ododok.db.model.User;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class ReviewPageRes {

    long reviewPageId;
    User user;
    int reviewPagePage;
    String reviewPageContent;
    LocalDate reviewPageDate;

    @Builder
    public ReviewPageRes(long reviewPageId, User user,
                         int reviewPagePage, String reviewPageContent,
                         LocalDate reviewPageDate){
        this.reviewPageId = reviewPageId;
        this.user = user;
        this.reviewPagePage = reviewPagePage;
        this.reviewPageContent = reviewPageContent;
        this.reviewPageDate = reviewPageDate;
    }
}
