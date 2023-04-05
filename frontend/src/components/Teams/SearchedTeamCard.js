// import React, { useState, useEffect } from "react";
import styles from "../../styles/Teams.module.scss";
import { useNavigate } from "react-router-dom";

function SearchedTeamCard({teams}) {
  const movePage = useNavigate();

  const teamClick = (team) => {
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

export default SearchedTeamCard;
