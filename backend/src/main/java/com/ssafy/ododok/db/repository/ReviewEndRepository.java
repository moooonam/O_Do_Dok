package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Dodok;
import com.ssafy.ododok.db.model.ReviewEnd;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewEndRepository extends JpaRepository<ReviewEnd,Long> {
    List<ReviewEnd> findAllByDodok(Dodok dodok);

}
