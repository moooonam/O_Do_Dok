package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.model.UserSurvey;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserSurveyRepository extends JpaRepository<UserSurvey, Integer> {

    UserSurvey save(UserSurvey userSurvey);
    UserSurvey findByUser(User user);

}
