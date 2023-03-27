package com.ssafy.ododok.db.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicInsert
public class ReviewPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewPageId;

    @ManyToOne
    @JoinColumn(name="dodok_id")
    private Dodok dodok;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Column(nullable = false)
    private int reviewPagePage;

    @Column(nullable = false)
    private String reviewPageContent;

    @Column(nullable = false)
    private LocalDate reviewPageDate;

    public void changeReviewPageContent(String reviewPageContent){
        this.reviewPageContent = reviewPageContent;
    }

    @Builder
    public ReviewPage(User user, Dodok dodok, String reviewPageContent, LocalDate reviewPageDate, int reviewPagePage) {
        this.user = user;
        this.dodok = dodok;
        this.reviewPageContent = reviewPageContent;
        this.reviewPageDate = reviewPageDate;
        this.reviewPagePage = reviewPagePage;
    }

}
