package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Dodok;
import com.ssafy.ododok.db.model.ReviewEnd;
import com.ssafy.ododok.db.model.ReviewPage;
import com.ssafy.ododok.db.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewEndRepository extends JpaRepository<ReviewEnd,Long> {
    List<ReviewEnd> findAllByDodok(Dodok dodok);
    List<ReviewEnd> findAllByUser(User user);
    void deleteAllByDodok(Dodok dodok);
    ReviewEnd findByReviewEndId(long endReviewId);
    ReviewEnd findByUser(User user);
}
