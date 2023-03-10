package com.ssafy.ododok.db.model;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="team_id")
    private Team team;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="book_id")
    private Book book;

    @Column(nullable = false)
    private Date dodokStartdate;

    @Column(nullable = false)
    private Date dodokEnddate;

    @Column(nullable = false)
    private boolean dodokComplete;

}
