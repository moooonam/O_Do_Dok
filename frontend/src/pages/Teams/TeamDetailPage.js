import React, { useState, useEffect } from "react";
import styles from "../../styles/TeamDetail.module.scss";
import JoinTeamModal from "../../components/Teams/Modal/JoinTeamModal";
import { Api } from "../../Api";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";

function TeamDetailPage() {
  // const location = useLocation();
  const movePage = useNavigate();

  const [teamDetail, setTeamDetail] = useState({
    teamName: "",
    teamGenre1: "",
    teamGenre2: "",
    teamGenre3: "",
    teamOnoff: "",
    teamRegion: "",
    teamRule1: "",
    teamRule2: "",
    teamRule3: "",
    teamRecruitText: "",
  });

  const [myTeam, setMyTeam] = useState({
    team: false,
  })

  useEffect(() => {
    let Id = localStorage.getItem("nowTeam");
    Api.get(`/teams/info/${Id}`)
      .then((res) => {
        setTeamDetail({
          ...teamDetail,
          teamName: res.data.teamName,
          teamGenre1: res.data.teamGenre1,
          teamGenre2: res.data.teamGenre2,
          teamGenre3: res.data.teamGenre3,
          teamOnoff: res.data.teamOnoff,
          teamRegion: res.data.teamRegion,
          teamRule1: res.data.teamRule1,
          teamRule2: res.data.teamRule2,
          teamRule3: res.data.teamRule3,
          teamRecruitText: res.data.teamRecruitText,
        });
      })

      Api.get("user/myTeam", {headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      }})
      .then((res) => {
        if (res.data === "") {
          setMyTeam({...myTeam, team:false})
        } else {
          setMyTeam({...myTeam, team:true})
        }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goMoreInfo = () => {
    let Id = localStorage.getItem("nowTeam");
    movePage(`/teams/${Id}/moreinfo`)
  }

  return (
    <div className={styles["wrap-all"]}>
      <div className={styles.teamname}>{teamDetail.teamName}</div>
      <div className={styles["wrap-content"]}>
        <div className={styles["wrap-genres"]}>
          <div className={styles["hashtag"]}># {teamDetail.teamOnoff === 'ON' ? '온라인' : ( teamDetail.teamOnoff === 'OFF' ? '오프라인' :
                  '온오프라인'
                  )} </div>
          <div className={styles["hashtag"]}>#{teamDetail.teamRegion}</div>
        </div>
        <div className={styles["wrap-genres"]}>
          <div className={styles["hashtag"]}>#{teamDetail.teamGenre1}</div>
          <div className={styles["hashtag"]}>#{teamDetail.teamGenre2}</div>
          <div className={styles["hashtag"]}>#{teamDetail.teamGenre3}</div>
        </div>
        <div className={styles["wrap-title"]}>
          <h2>모임 규칙</h2>
          <div className={styles.line}></div>
        </div>
        <div className={styles.rule}>- {teamDetail.teamRule1}</div>
        <div className={styles.rule}>- {teamDetail.teamRule2}</div>
        <div className={styles.rule}>- {teamDetail.teamRule3}</div>
        <div className={styles["wrap-title"]}>
          <h2>모임 소개</h2>
          <div className={styles.line}></div>
        </div>
        <div className={styles.teamintroduction}>
          {teamDetail.teamRecruitText}
        </div>
      </div>
      <div className={styles["wrap-btn"]}>
        <div className={styles["godetail-btn"]} onClick={() => {goMoreInfo()}}>더 알아보기</div>
        { myTeam.team ? null : <JoinTeamModal teamName={teamDetail.teamName} />}
      </div>
    </div>
  );
}

export default TeamDetailPage;
