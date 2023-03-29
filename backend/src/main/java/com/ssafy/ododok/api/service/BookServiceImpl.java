package com.ssafy.ododok.api.service;

import com.ssafy.ododok.api.controller.KNN;
import com.ssafy.ododok.api.request.BookAddPostReq;
import com.ssafy.ododok.db.model.Book;
import com.ssafy.ododok.db.model.Team;
import com.ssafy.ododok.db.repository.BookRepository;
import com.ssafy.ododok.db.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceImpl implements BookService{

    private final BookRepository bookRepository;
    private final TeamRepository teamRepository;

    @Autowired
    KNN knn;

    @Autowired
    BookServiceImpl(BookRepository bookRepository, TeamRepository teamRepository){
        this.bookRepository=bookRepository;
        this.teamRepository = teamRepository;
    }

    @Override
    public void addBook(BookAddPostReq bookAddPostReq) {
        Book book = Book.builder()
                .bookTitle(bookAddPostReq.getBookTitle())
                .bookAuthor(bookAddPostReq.getBookAuthor())
                .bookGenre(bookAddPostReq.getGenre())
                .bookPagecnt(bookAddPostReq.getPage())
                .build();
        bookRepository.save(book);
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

    // 책 추천
    @Override
    public List<Book> recommendBooks(Long teamId) {
        // 팀ID로 팀의 선호장르 가져오기
        Team team = teamRepository.findById(teamId).get();

        // 추천된 책 리스트 -> books
        List<String> books = knn.knn(team);
        System.out.println("books : "+books);

        // Book객체 리스트로 보내줌
        List<Book> recomBookList = new ArrayList<Book>();
        for(int i=0; i<books.size(); i++){
            recomBookList.add(bookRepository.findByBookTitle(books.get(i)));
        }

        return recomBookList;
    }


}
