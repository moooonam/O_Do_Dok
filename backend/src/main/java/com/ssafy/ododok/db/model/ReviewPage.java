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
public class ReviewPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewPageId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="dodok_id")
    private Dodok dodok;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="team_user_id")
    private TeamUser teamUser;

    @Column(nullable = false)
    private int reviewPagePage;

    @Column(nullable = false)
    private String reviewPageContent;

    @Column(nullable = false)
    private LocalDate reviewPageDate;


}
