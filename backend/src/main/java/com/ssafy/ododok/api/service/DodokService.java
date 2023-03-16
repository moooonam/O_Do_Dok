package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.DodokCreateReq;
import com.ssafy.ododok.db.model.*;

import java.util.List;

public interface DodokService {
    List<Dodok> showLastAllDodoks(User user);
    List<ReviewPage> getReviewPageList(Dodok dodok);
    List<ReviewPage> getCurReviewPageList(User user);
    List<ReviewEnd> getRivewEndList(Dodok dodok);
    void startDodok(User user, DodokCreateReq dodokCreateReq);
}
