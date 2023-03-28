package com.ssafy.ododok.api.request;

import lombok.Getter;

@Getter
public class UserAcceptPostReq {
    private Long applyId;
    private Boolean isAccept;
}
