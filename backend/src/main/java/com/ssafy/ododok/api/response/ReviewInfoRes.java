package com.ssafy.ododok.api.response;

import com.ssafy.ododok.db.model.Dodok;
import com.ssafy.ododok.db.model.ReviewEnd;
import com.ssafy.ododok.db.model.ReviewPage;
import com.ssafy.ododok.db.model.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReviewInfoRes {
    User user;
    List<ReviewPage> reviewPageList;
    List<ReviewEnd> reviewEndList;

    public ReviewInfoRes(User user, List<ReviewPage> reviewPageList, List<ReviewEnd> reviewEndList){
        this.user=user;
        this.reviewPageList=reviewPageList;
        this.reviewEndList=reviewEndList;
    }

}
