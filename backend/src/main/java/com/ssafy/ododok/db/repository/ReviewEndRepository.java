package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewEndRepository extends JpaRepository<ReviewEnd,Long> {
    List<ReviewEnd> findAllByDodok(Dodok dodok);
    List<ReviewEnd> findAllByUser(User user);
    void deleteAllByDodok(Dodok dodok);
    ReviewEnd findByReviewEndId(long endReviewId);
    ReviewEnd findByUserAndDodok(User user, Dodok doodok);


    void deleteAllByUser(User user);

    Long countByUser(User user);
}
