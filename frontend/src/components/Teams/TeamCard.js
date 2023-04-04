import React, { useState, useEffect } from "react";
import styles from "../../styles/Teams.module.scss";
import { Api } from "../../Api";
import { useNavigate } from "react-router-dom";

function TeamCard({ genre }) {
  const movePage = useNavigate();

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    Api.get("/teams")
      .then((res) => {
        setTeams(...teams, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teamClick = (team) => {
    movePage(`/teams/${team.teamId}`);
    localStorage.setItem("nowTeam", team.teamId);
  };

  const renderTeamCard = teams.map((team) => {
    return (
      <div
        key={team.teamId}
        className={styles["wrap-team"]}
        onClick={() => {
          teamClick(team);
        }}
      >
        <img src={team.teamImage} alt="" />
        <div className={styles.teamname}>{team.teamName}</div>
        <div className={styles["wrap-isonline-genre"]}>
        {team.teamOnoff === 'ON' ? <div>온라인</div>  : ( team.teamOnoff === 'OFF' ? <div>오프라인</div> :
                  <div>온오프라인</div>
                  )} 
          <div>#{team.teamGenre1}</div>
          <div>#{team.teamGenre2}</div>
          <div>#{team.teamGenre3}</div>
        </div>
      </div>
    );
  });

  const renderGenreTeamCard = teams.map((team) => {
    if (
      team.teamGenre1 === genre ||
      team.teamGenre2 === genre ||
      team.teamGenre3 === genre
    ) {
      return (
        <div
          key={team.teamId}
          className={styles["wrap-team"]}
          onClick={() => {
            teamClick(team);
          }}
        >
          <img src={team.teamImage} alt="" />
          <div className={styles.teamname}>{team.teamName}</div>
          <div className={styles["wrap-isonline-genre"]}>
            {team.teamOnoff === "ON" ? (
              <div>온라인</div>
            ) : team.teamOOnoff === "OFF" ? (
              <div>오프라인</div>
            ) : (
              <div>온오프라인</div>
            )}
            <div>#{team.teamGenre1}</div>
            <div>#{team.teamGenre2}</div>
            <div>#{team.teamGenre3}</div>
          </div>
        </div>
      );
    }
    return <div className={styles.blank}></div>;
  });
  return (
    <div>
      {genre === "장르" ? (
        <div className={styles["wrap-teamcards"]}>{renderTeamCard}</div>
      ) : (
        <div className={styles["wrap-teamcards"]}> {renderGenreTeamCard}</div>
      )}
    </div>
  );
}

export default TeamCard;
