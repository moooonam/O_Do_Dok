package com.ssafy.ododok.db.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
public class ReviewEnd {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewEndId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="dodok_id")
    private Dodok dodok;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="team_user_id")
    private TeamUser teamUser;

    @Column(nullable = false)
    private String reviewEndContent;

    @Column(nullable = false)
    private double reviewEndBookrating;

    @Column(nullable = false)
    private double reviewEndGenrerating;

    @Column(nullable = false)
    private LocalDate reviewEndDate;


}
