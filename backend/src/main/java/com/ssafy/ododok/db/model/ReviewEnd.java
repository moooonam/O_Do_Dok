package com.ssafy.ododok.db.model;

import com.ssafy.ododok.api.request.EndReviewModifyPutReq;
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

}
