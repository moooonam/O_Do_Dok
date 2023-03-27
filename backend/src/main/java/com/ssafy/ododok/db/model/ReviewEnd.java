package com.ssafy.ododok.db.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicInsert
public class ReviewEnd {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewEndId;

    @ManyToOne
    @JoinColumn(name="dodok_id")
    private Dodok dodok;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Column(nullable = false)
    private String reviewEndContent;

    @Column(nullable = false)
    private double reviewEndBookrating;

    @Column(nullable = false)
    private double reviewEndGenrerating;

    @Column(nullable = false)
    private LocalDate reviewEndDate;

    public void changeContent(String reviewEndContent){
        this.reviewEndContent=reviewEndContent;
    }

    @Builder
    public ReviewEnd(User user, Dodok dodok, String reviewEndContent, LocalDate reviewEndDate, double reviewEndBookrating, double reviewEndGenrerating) {
        this.user = user;
        this.dodok = dodok;
        this.reviewEndContent = reviewEndContent;
        this.reviewEndDate = reviewEndDate;
        this.reviewEndBookrating = reviewEndBookrating;
        this.reviewEndGenrerating = reviewEndGenrerating;
    }
}
