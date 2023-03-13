package com.ssafy.ododok.db.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
public class TeamUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teamUserId;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="team_id")
    private Team team;

    @ManyToOne
    @JoinColumn(name="role_name")
    private Role role;

}
