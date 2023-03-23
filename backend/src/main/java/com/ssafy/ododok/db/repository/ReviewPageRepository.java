package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Dodok;
import com.ssafy.ododok.db.model.ReviewPage;
import com.ssafy.ododok.db.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReviewPageRepository  extends JpaRepository<ReviewPage,Long> {
    List<ReviewPage> findAllByDodok(Dodok dodok);

    @Transactional
    @Modifying
    void deleteAllByDodok(Dodok dodok);

    ReviewPage findByReviewPageId(Long reviewPageId);

}
