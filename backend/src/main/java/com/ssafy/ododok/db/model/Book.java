package com.ssafy.ododok.db.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@Builder
@Entity
@DynamicInsert
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;

    @Column(nullable = false)
    private String bookTitle;

    @Column(nullable = false)
    private int bookPagecnt;

    @Column(nullable = false)
    private String bookGenre;

    @Column(nullable = false)
    private String bookAuthor;

    @Column(nullable = false)
    private String bookImg;

    @Column(nullable = false)
    private String bookMembercnt;

    @Column(nullable = false)
    private String bookRating;

    @Builder
    public Book(String bookTitle,String bookAuthor,int bookPagecnt){
        this.bookTitle=bookTitle;
        this.bookAuthor=bookAuthor;
        this.bookPagecnt=bookPagecnt;
    }
}
