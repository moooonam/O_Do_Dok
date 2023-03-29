package com.ssafy.ododok.api.controller;

import com.ssafy.ododok.api.request.BookAddPostReq;
import com.ssafy.ododok.api.service.BookService;
import com.ssafy.ododok.db.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*")
@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;

    @Autowired
    BookController(BookService bookService){
        this.bookService = bookService;
    }

    // 임시 책 조회
    @Autowired
    KNN knn;

    // 책 테이블에 책 추가
    @PostMapping("/add")
    public ResponseEntity<String> addBook(@RequestBody BookAddPostReq bookAddPostReq){
        bookService.addBook(bookAddPostReq);
        return new ResponseEntity("책이 추가 됐습니다.", HttpStatus.OK);
    }

    //책 조회
    @GetMapping("/list")
    public ResponseEntity<List<Book>> listBooks(){
        List<Book> bookList = bookService.listBooks();
        return new ResponseEntity(bookList,HttpStatus.OK);
    }

    //책 검색
    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> searchBooks(@PathVariable String keyword){
        System.out.println("keyword: "+ keyword);
        List<Book> searchResult = bookService.searchBooks(keyword);
        if(searchResult.size()==0){
            return new ResponseEntity<>("검색 결과가 없습니다.",HttpStatus.OK);
        }else{
            return new ResponseEntity<>(searchResult,HttpStatus.OK);
        }
    }

    // 임시 책 조회
    @GetMapping("/zzz")
    public ResponseEntity<?> zzz(){

        knn.knn();
        return null;
    }

    // 베스트 셀러 책 조회
    @GetMapping("/bestBook")
    public ResponseEntity<?> bestBook(){
        List<Book> bookList = bookService.listBestBooks();
        return new ResponseEntity(bookList,HttpStatus.OK);
    }

}
