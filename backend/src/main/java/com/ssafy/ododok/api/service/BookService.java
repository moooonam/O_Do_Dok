package com.ssafy.ododok.api.service;

import com.ssafy.ododok.db.model.Book;

import java.util.List;

public interface BookService {

    List<Book> listBooks();
    List<Book> searchBooks(String keyword);
    Book findBook(String title,String author);
    void selectBook(Long id);

    void addBook(Book book);
}

