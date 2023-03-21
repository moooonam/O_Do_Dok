package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {

    RefreshToken save(RefreshToken refreshToken);
}
