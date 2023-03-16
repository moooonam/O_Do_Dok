package com.ssafy.ododok.api.service;

import com.ssafy.ododok.db.model.Book;

import java.util.List;

public interface BookService {

    List<Book> listBooks();
    Book findBook(String title,String author);

}
