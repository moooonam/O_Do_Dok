package com.ssafy.ododok.db.model;

import com.ssafy.ododok.api.request.BookAddPostReq;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
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

    @Column(nullable = false, unique = true)
    private String bookTitle;

    @Column(nullable = false)
    private int bookPagecnt;

    @Column(nullable = false)
    private String bookGenre;

    @Column(nullable = false)
    private String bookAuthor;

    @ColumnDefault("'tmp'")
    private String bookImg;

    @ColumnDefault("0")
    private Integer bookMembercnt;

    @ColumnDefault("0")
    private double bookRating;

    @ColumnDefault("false")
    private boolean needCheck;

    @Builder
    public Book(String bookTitle,String bookAuthor,String bookGenre,int bookPagecnt, boolean needCheck){
        this.bookTitle=bookTitle;
        this.bookAuthor=bookAuthor;
        this.bookGenre=bookGenre;
        this.bookPagecnt=bookPagecnt;
        this.needCheck = needCheck;
    }

    public void changeBookMembercnt(Integer bookMembercnt){
        this.bookMembercnt = bookMembercnt;
    }

    public void changeBookRating(double bookRating){
        this.bookRating = bookRating;
    }
}
