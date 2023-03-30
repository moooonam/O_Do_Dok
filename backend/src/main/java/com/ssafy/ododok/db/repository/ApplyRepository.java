package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Apply;
import com.ssafy.ododok.db.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplyRepository extends JpaRepository<Apply, Long> {
    User getUserByUser_UserId(Long userId);

    List<Apply> findMemberByTeam_TeamId(Long teamId);

    Apply findApplyByUser_UserId(Long userId);
}
