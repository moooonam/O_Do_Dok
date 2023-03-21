package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.request.BookAddPostReq;
import com.ssafy.ododok.db.model.Book;
import com.ssafy.ododok.db.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BookServiceImpl implements BookService{
    private final BookRepository bookRepository;

    @Autowired
    BookServiceImpl(BookRepository bookRepository){
        this.bookRepository=bookRepository;
    }

    @Override
    public List<Book> listBooks() {

        return bookRepository.findAll();
    }

    @Override
    public List<Book> searchBooks(String keyword) {
        List<Book> searchResult= bookRepository.findAllByBookTitleContainingIgnoreCase(keyword);
        return searchResult;
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
    public void addBook(BookAddPostReq bookAddPostReq) {
//        Book.addBook(bookAddPostReq);
        Book book = Book.builder()
                .bookTitle(bookAddPostReq.getBookTitle())
                .bookAuthor(bookAddPostReq.getBookAuthor())
                .bookGenre(bookAddPostReq.getGenre())
                .bookPagecnt(bookAddPostReq.getPage())
                .build();
        bookRepository.save(book);
    }
}
