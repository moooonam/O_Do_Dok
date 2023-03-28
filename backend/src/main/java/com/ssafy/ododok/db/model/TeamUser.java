package com.ssafy.ododok.db.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@DynamicInsert
public class TeamUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamUserId;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="team_id")
    private Team team;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void changeRole(Role role){
        this.role = role;
    }

    @Builder
    public TeamUser(User user, Team team, Role role) {
        this.user = user;
        this.team = team;
        this.role = role;
    }

}
