package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Book;
import com.ssafy.ododok.db.model.Genre;
import com.ssafy.ododok.db.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book,Long> {
    List<Book> findAll();
    List<Book> findAllByBookTitleContainingIgnoreCase(String bookTitle);
    Optional<Book> findByBookTitleAndBookAuthorAndBookPagecnt(String bookTitle, String bookAuthor,int bookPageCnt);

//    Book findByBookTitle(String s);
//    Genre findTopByTeamOrderByRatingDesc(Team team);

//    findTopByTeamOrderByRatingDesc

    List<Book> findTop20ByOrderByAwardDesc();
    Optional<Book> findByBookTitle(String bookTitle);
    Long findIdByBookTitle(String s);


    Long findAllByBookTitle(String bookTitle);
}
