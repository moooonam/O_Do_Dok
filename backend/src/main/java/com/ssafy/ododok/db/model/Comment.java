package com.ssafy.ododok.db.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;

    @Column(nullable = false)
    private String commentContent;

    @Column(nullable = false)
    private LocalDate commentDate;

    @ManyToOne
    @JoinColumn(name="board_id")
    private Board board;
}
