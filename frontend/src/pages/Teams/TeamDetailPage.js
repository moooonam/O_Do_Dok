import React, { useState, useEffect } from "react";
import styles from "../../styles/TeamDetail.module.scss";
import JoinTeamModal from "../../components/Teams/Modal/JoinTeamModal";
import { Api } from "../../Api";
// import { useLocation } from "react-router-dom";

function TeamDetailPage() {
  // const location = useLocation();

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

  useEffect(() => {
    // console.log(location.pathname.split('/')[2]);
    console.log(localStorage.getItem("nowTeam"));
    let Id = localStorage.getItem("nowTeam");
    Api.get(`/teams/${Id}`)
      .then((res) => {
        console.log("모임 디테일 정보 불러오기 완료  ");
        console.log(res.data);
        setTeamDetail({
          ...teamDetail,
          teamName: res.data[0].teamName,
          teamGenre1: res.data[0].teamGenre1,
          teamGenre2: res.data[0].teamGenre2,
          teamGenre3: res.data[0].teamGenre3,
          teamOnoff: res.data[0].teamOnoff,
          teamRegion: res.data[0].teamRegion,
          teamRule1: res.data[0].teamRule1,
          teamRule2: res.data[0].teamRule2,
          teamRule3: res.data[0].teamRule3,
          teamRecruitText: res.data[0].teamRecruitText,
        });
        console.log('저장된 팀 정보')
        console.log(teamDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles["wrap-all"]}>
      <div className={styles.teamname}>{teamDetail.teamName}</div>
      <div className={styles["wrap-content"]}>
        <div className={styles["wrap-genres"]}>
          <div className={styles["hashtag"]}>#{teamDetail.teamOnoff}</div>
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
        <div className={styles["godetail-btn"]}>더 알아보기</div>
        <JoinTeamModal teamName={teamDetail.teamName} />
      </div>
    </div>
  );
}

export default TeamDetailPage;
