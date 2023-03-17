package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.model.UserSurvey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User save(User user);

//    Optional<User> findByUserEmail(String email);
    Optional<User> findByUserNickname(String nickname);
    User findByUserName(String username);
    User findByUserEmail(String email);
}
