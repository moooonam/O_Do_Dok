package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.PageReviewCreatePostReq;
import com.ssafy.ododok.api.request.PageReviewPutReq;
import com.ssafy.ododok.db.model.ReviewPage;
import com.ssafy.ododok.db.model.User;


import java.util.List;

public interface ReviewPageService {

    String writePageReview(PageReviewCreatePostReq pageReviewCreatePostReq, User user);
    boolean modifyPageReview(PageReviewPutReq pageReviewPutReq, User user);
    boolean deletePageReview(Long pageReviewId, User user) throws Exception;
    ReviewPage getReviewPage(Long pageReviewId, User user);
    List<ReviewPage> getCurReviewPageList(User user);
    List<ReviewPage> getReviewPageList(User user);

}
