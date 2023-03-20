package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Dodok;
import com.ssafy.ododok.db.model.ReviewPage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewPageRepository  extends JpaRepository<ReviewPage,Long> {
    List<ReviewPage> findAllByDodok(Dodok dodok);
    void deleteAllByDodok(Dodok dodok);
}
