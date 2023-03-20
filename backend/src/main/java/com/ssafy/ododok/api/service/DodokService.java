package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.*;
import com.ssafy.ododok.db.model.*;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface DodokService {
    List<Dodok> showLastAllDodoks(User user);
    List<ReviewPage> getReviewPageList(Dodok dodok);
    List<ReviewPage> getCurReviewPageList(User user);
    List<ReviewEnd> getRivewEndList(Dodok dodok);
    List<ReviewEnd> getRivewEndList(Long dodokId);

    void startDodok(User user, DodokCreateReq dodokCreateReq);
    void deleteDodok(Authentication authentication,Long dodokId);
    void timeEndDodok();
    int endDodok(Long dodokId);

    void writePageReview(PageReviewCreatePostReq pageReviewCreatePostReq,User user);

    boolean modifyPageReview(PageReviewPutReq pageReviewPutReq, User user);

    boolean deletePageReview(Long pageReviewId, User user);

    void writeEndReview(EndReviewCreatePostReq endReviewCreatePostReq, User user);

    boolean modifyEndReview(EndReviewModifyPutReq endReviewModifyPutReq,User user);

    boolean deleteEndReview(Long endReviewId, User user);
}
