package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.*;
import com.ssafy.ododok.db.model.*;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface DodokService {

    String startDodok(User user, DodokCreateReq dodokCreateReq);
    void timeEndDodok() throws Exception;
    int endDodok(Long dodokId) throws Exception;
    void deleteDodok(Authentication authentication, Long dodokId) throws Exception;
    List<Dodok> showLastAllDodoks(User user);

    String writePageReview(PageReviewCreatePostReq pageReviewCreatePostReq, User user);
    boolean modifyPageReview(PageReviewPutReq pageReviewPutReq, User user);
    boolean deletePageReview(Long pageReviewId, User user) throws Exception;
    ReviewPage getReviewPage(Long pageReviewId, User user);
    List<ReviewPage> getCurReviewPageList(User user);

    String writeEndReview(EndReviewCreatePostReq endReviewCreatePostReq, User user);
    boolean modifyEndReview(EndReviewModifyPutReq endReviewModifyPutReq, User user);
    boolean deleteEndReview(Long endReviewId, User user);
    ReviewEnd getEndReview(Long endReviewId, User user);
    List<ReviewEnd> getCurRivewEndList(User user);

    List<ReviewPage> getReviewPageList(Dodok dodok);
    List<ReviewEnd> getRivewEndList(Dodok dodok);
}
