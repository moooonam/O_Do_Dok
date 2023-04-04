package com.ssafy.ododok.db.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicInsert
public class recomBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recomBookId;

    @Column(nullable = false)
    private double recomBookGenre;

    @Column(nullable = false)
    private double recomBookAge;

    @Column(nullable = false)
    private double recomBookScore;

    @Column(nullable = false)
    private String recomBookTitle;
}
