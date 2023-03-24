package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.EndReviewCreatePostReq;
import com.ssafy.ododok.api.request.EndReviewModifyPutReq;
import com.ssafy.ododok.db.model.ReviewEnd;
import com.ssafy.ododok.db.model.ReviewPage;
import com.ssafy.ododok.db.model.User;


import java.util.List;

public interface ReviewEndService {

    String writeEndReview(EndReviewCreatePostReq endReviewCreatePostReq, User user);
    boolean modifyEndReview(EndReviewModifyPutReq endReviewModifyPutReq, User user);
    boolean deleteEndReview(Long endReviewId, User user);
    ReviewEnd getEndReview(Long endReviewId, User user);
    List<ReviewEnd> getCurRivewEndList(User user);

    List<ReviewEnd> getReviewEndList(User user);
}
