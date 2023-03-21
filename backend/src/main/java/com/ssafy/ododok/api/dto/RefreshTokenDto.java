package com.ssafy.ododok.api.dto;

public class RefreshTokenDto {

    private String email;

    private String refreshToken;

    public RefreshTokenDto(String email, String refreshToken) {
        this.email = email;
        this.refreshToken = refreshToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getEmail() {
        return email;
    }

}
