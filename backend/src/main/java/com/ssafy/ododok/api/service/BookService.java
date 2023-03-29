package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.BookAddPostReq;
import com.ssafy.ododok.db.model.Book;

import java.util.List;

public interface BookService {

    void addBook(BookAddPostReq bookAddPostReq);
    List<Book> listBooks();
    List<Book> searchBooks(String keyword);

    List<Book> listBestBooks();
}

