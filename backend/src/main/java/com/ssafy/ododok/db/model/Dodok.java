package com.ssafy.ododok.db.model;

import com.ssafy.ododok.common.util.BooleanToYNConverter;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicInsert
public class Dodok {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dodokId;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(nullable = false)
    private LocalDate dodokStartdate;

    @Column(nullable = false)
    private LocalDate dodokEnddate;

    @Convert(converter = BooleanToYNConverter.class)
    @Column(nullable = false)
    private boolean dodokComplete;

    @Convert(converter = BooleanToYNConverter.class)
    @Column(nullable = false)
    private boolean dodokOpen;

    public void changeDodokOpen(boolean dodokOpen){
        this.dodokOpen = dodokOpen;
    }
    public void changeComplete(boolean dodokComplete){
        this.dodokComplete = dodokComplete;
    }

    @Builder
    public Dodok(LocalDate dodokStartdate, LocalDate dodokEnddate, Team team, Book book) {
        this.dodokStartdate = dodokStartdate;
        this.dodokEnddate = dodokEnddate;
        this.team = team;
        this.book = book;
    }

}
