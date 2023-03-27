package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.model.UserSurvey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User save(User user);

    Optional<User> findByUserEmail(String email);
    Optional<User> findByUserNickname(String nickname);

    @Transactional
    @Modifying // select 문이 아님을 나타낸다
    @Query("UPDATE User set userPassword = :password where userId = :user_id")
    void updateUserPassword(@Param("password")String password, @Param("user_id")Long user_id) throws Exception;

}
