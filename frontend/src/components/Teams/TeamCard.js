import React, { useState, useEffect } from "react";
import styles from "../../styles/Teams.module.scss";
import { Api } from "../../Api";
import { useNavigate } from "react-router-dom";

function TeamCard() {
  const movePage = useNavigate();

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    Api.get("/teams")
      .then((res) => {
        // console.log('모임 데이터 불러오기 완료----------')
        // console.log(res.data);
        setTeams(...teams, res.data)
      })
      .catch((err) => {
        console.log(err);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teamClick = (team) => {
    console.log(team.teamId)
    movePage(`/teams/${team.teamId}`);
    localStorage.setItem("nowTeam", team.teamId)
  }

  const renderTeamCard = teams.map((team) => {
    return (
      <div key={team.teamId} className={styles["wrap-team"]} onClick={() => {teamClick(team)}}>
        <img src={team.teamImage} alt="" />
        <div className={styles.teamname}>{team.teamName}</div>
        <div className={styles["wrap-isonline-genre"]}>
          <div>{team.teamOnoff}</div>
          <div>#{team.teamGenre1}</div>
          <div>#{team.teamGenre2}</div>
          <div>#{team.teamGenre3}</div>
        </div>
      </div>
    );
  });
  return <div className={styles["wrap-teamcards"]}>{renderTeamCard}</div>;
}

export default TeamCard;
