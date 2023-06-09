package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.*;
import com.ssafy.ododok.api.response.ReviewEndRes;
import com.ssafy.ododok.api.response.ReviewPageRes;
import com.ssafy.ododok.db.model.*;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface DodokService {

    String startDodok(User user, DodokCreateReq dodokCreateReq);
    void timeEndDodok() throws Exception;
    int endDodok(Long dodokId) throws Exception;
    void deleteDodok(Authentication authentication, Long dodokId) throws Exception;
    List<Dodok> showLastTeamAllDodoks(User user, Long teamId);
    List<Dodok> showLastAllDodoks();

    List<ReviewPage> getReviewPageList(Dodok dodok);
    List<ReviewEnd> getRivewEndList(Dodok dodok);

    List<ReviewPageRes> getReviewPageList2(Dodok dodok);
    List<ReviewEndRes> getRivewEndList2(Dodok dodok);

    String updateDodokOpen(User user, Long dodokId);
    String updateDodokClose(User user, Long dodokId);

    List<Dodok> searchDodoks(String keyword);

    Dodok nowDodok(User user);

    Dodok detailDodok(Long dodokId);
}
