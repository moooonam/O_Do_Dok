package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.UserApplyPostReq;
import com.ssafy.ododok.db.model.Apply;
import com.ssafy.ododok.db.model.User;

import java.util.List;

public interface ApplyService {
    boolean getUserByUserId(Long userId);

    void setUserApply(UserApplyPostReq userApplyPostReq, User user);

    List<Apply> getApplyMember(Long teamId);

    void addMember(Long applyId);

    void deleteApplyMember(Long applyId);

    boolean getUserHaveTeam(Long userId);
}
