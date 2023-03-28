package com.ssafy.ododok.db.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicInsert
public class RefreshToken {

    @Id
    private String email;
    private String refreshToken;

    public void changeEmail(String email){
        this.email = email;
    }
    public void changeRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

    @Builder
    public RefreshToken(String email, String refreshToken) {
        this.email = email;
        this.refreshToken = refreshToken;
    }

}
