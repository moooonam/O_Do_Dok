package com.ssafy.ododok.db.model;

import com.ssafy.ododok.common.util.BooleanToYNConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Dodok {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dodokId;

    @ManyToOne
    @JoinColumn(name="team_id")
    private Team team;

    @ManyToOne
    @JoinColumn(name="book_id")
    private Book book;

    @Column(nullable = false)
    private Date dodokStartdate;

    @Column(nullable = false)
    private Date dodokEnddate;
    @Convert(converter = BooleanToYNConverter.class)
    @Column(nullable = false)
    private boolean dodokComplete;

    @Builder
    public Dodok(Team team,Book book,Date dodokStartdate,Date dodokEndDate){
     this.team=team;
     this.book=book;
     this.dodokStartdate=dodokStartdate;
     this.dodokEnddate=dodokEndDate;
     this.setDodokComplete(false);
    }
}
