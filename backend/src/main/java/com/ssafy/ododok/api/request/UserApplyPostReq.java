package com.ssafy.ododok.api.request;

import lombok.Getter;

@Getter
public class UserApplyPostReq {
    private String applyMsg;
    private Long teamId;
}
