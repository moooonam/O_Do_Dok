package com.ssafy.ododok.common.auth;

public interface JwtProperties {

    String SECRET = "오도독"; // 우리 서버만 알고 있는 비밀값
    long EXPIRATION_TIME = 1000 * 60 * 60 * 5;  // 5시간
//    long EXPIRATION_TIME = 1000 * 30;
    long REFRESH_TIME = 1000 * 60 * 60 * 24 * 5; // 5일
    String TOKEN_PREFIX = "Bearer ";
//    String HEADER_STRING = "Authorization";
    String ACCESS_HEADER_STRING = "access-token";
    String REFRESH_HEADER_STRING = "refresh-token";

}
