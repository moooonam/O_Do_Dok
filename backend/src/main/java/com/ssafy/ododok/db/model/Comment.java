package com.ssafy.ododok.db.model;

import lombok.*;
import net.bytebuddy.asm.Advice;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicInsert
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Column(nullable = false)
    private String commentContent;

    @Column(nullable = false)
    private LocalDate commentDate;

    @ManyToOne
    @JoinColumn(name="board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    public void changeComment(String commentContent){
        this.commentContent = commentContent;
    }

    @Builder
    public Comment(String commentContent, LocalDate commentDate, Board board, User user) {
        this.commentContent = commentContent;
        this.commentDate = commentDate;
        this.board = board;
        this.user = user;
    }
}
