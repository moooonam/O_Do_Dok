package com.ssafy.ododok.api.service;

import com.ssafy.ododok.db.model.Book;
import com.ssafy.ododok.db.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService{
    @Autowired
    BookRepository bookRepository;

    @Override
    public List<Book> listBooks() {

        return bookRepository.findAll();
    }

    @Override
    public List<Book> searchBooks(String keyword) {

        return null;
    }

    @Override
    public Book findBook(String title,String author)
    {
        return null;
    }

    @Override
    public void selectBook(Long id) {

        Book book= bookRepository.findById(id).get();
    }

    @Override
    public void addBook(Book book) {
        bookRepository.save(book);

        return;
    }
}
