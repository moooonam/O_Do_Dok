package com.ssafy.ododok.db.repository;

import com.ssafy.ododok.db.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book,Long> {
    List<Book> findAll();
    Optional<Book> findByBookTitleAndBookAuthor(String bookTitle, String bookAuthor);
}
