package com.ssafy.ododok.api.response;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ApplyRes {
    private Long applyId;
    private String nickname;
    private String msg;
    private LocalDate date;
    private String img;

    public ApplyRes(Long applyId, String nickname, String msg, LocalDate date, String img){
        this.applyId = applyId;
        this.nickname = nickname;
        this.msg = msg;
        this.date = date;
        this.img = img;
    }
}
