package com.ssafy.ododok.db.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicInsert
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(nullable = false)
    private String boardTitle;

    @Column(nullable = false)
    private String boardContent;

    @Column(nullable = false)
    private LocalDate boardDate;

    @ManyToOne
    @JoinColumn(name="team_id")
    private Team team;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="board_type")
    private BoardType boardType;

    public void changeTitle(String boardTitle){
        this.boardTitle = boardTitle;
    }
    public void changeContent(String boardContent){
        this.boardContent = boardContent;
    }

    @Builder
    public Board(String boardTitle, String boardContent, BoardType boardType, LocalDate boardDate) {
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.boardType = boardType;
        this.boardDate = boardDate;
    }

}
