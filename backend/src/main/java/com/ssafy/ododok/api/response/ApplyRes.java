package com.ssafy.ododok.api.response;

import java.time.LocalDate;

public class ApplyRes {
    private String nickname;
    private String msg;
    private LocalDate date;
    private String img;

    public ApplyRes(String nickname, String msg, LocalDate date, String img){
        this.nickname = nickname;
        this.msg = msg;
        this.date = date;
        this.img = img;
    }
}
