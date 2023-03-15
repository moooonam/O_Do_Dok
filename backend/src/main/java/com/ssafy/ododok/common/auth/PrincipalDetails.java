package com.ssafy.ododok.common.auth;

import com.ssafy.ododok.db.model.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Data
public class PrincipalDetails implements UserDetails{

    private User user; // 콤보지션

    public PrincipalDetails(User user) {
        this.user = user;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return user.getUserPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    // 이 계정 만료됐니?
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 이 계정이 잠겼니?
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 이 계정의 비밀번호가 1년이 지났니?
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 이 계정이 활성화 되어 있니?
    @Override
    public boolean isEnabled() {
        return true;
    }
}
