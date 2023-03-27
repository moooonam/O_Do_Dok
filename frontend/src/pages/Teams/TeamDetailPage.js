import React, { useState, useEffect } from "react";
import styles from "../../styles/TeamDetail.module.scss";
import JoinTeamModal from "../../components/Teams/Modal/JoinTeamModal";
import { Api } from "../../Api";
// import { useLocation } from "react-router-dom";

function TeamDetailPage() {
  // const location = useLocation();

  const [nowPage, setNowPage] = useState({
    nowId : ''
  })

  useEffect(() => {
    // console.log(location.pathname.split('/')[2]);
    console.log(localStorage.getItem('nowTeam'))
    setNowPage({ ...nowPage, nowId: localStorage.getItem('nowTeam')})
    console.log('현재 팀 정보')
    console.log(nowPage.nowId)
    Api.get( `/teams/${nowPage.nowId}`)
    .then((res) => {
      console.log('모임 디테일 정보 불러오기 완료  ')
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  const teamDetail = {
    teamName: "무경계",
    isOnline: true,
    genres: ["공포", "스릴러"],
    teamRules: [
      "도독 시작 전 게시판을 확인해주세요.",
      "도독에 2회 연속 미참여 시 경고입니다.",
      "오도독도독오도도도도독",
    ],
    teamIntroduction:
      "독서모임의 진수 [무경계]에 오신 것을 환영합니다. 무경계는 이름 그대로 경계가 없는 클럽입니다. 그래서 모임의 주제도, 함께 읽을 책도 정해져 있지 않죠. 주제와 장르를 불문하고 어떤 책이든 편견 없이 읽고 대화하기 위해 모든 것은 추천과 투표로 결정합니다. 평소의 나라면 하지 않았을 시도를 해보고 싶다면, 그날이 그날 같은 일상에서 벗어나 예상치 못한 즐거움을 누리고 싶다면 무경계에서 함께해요.",
  };
  const renderGenre = teamDetail.genres.map((genre) => {

    return <div className={styles["hashtag"]}>#{genre}</div>;
  });
  const renderTeamRule = teamDetail.teamRules.map((rule) => {
    return <div className={styles.rule}>- {rule}</div>;
  });
  return (
    <div className={styles["wrap-all"]}>
      <div className={styles.teamname}>{teamDetail.teamName}</div>
      <div className={styles["wrap-content"]}>
        <div className={styles["wrap-genres"]}>
          {teamDetail.isOnline ? (
            <div className={styles["hashtag"]}>#온라인</div>
          ) : (
            <div className={styles["hashtag"]}>#오프라인</div>
          )}
        </div>
        <div className={styles["wrap-genres"]}>{renderGenre}</div>
        <div className={styles["wrap-title"]}>
          <h2>모임 규칙</h2>
          <div className={styles.line}></div>
        </div>
        {renderTeamRule}
        <div className={styles["wrap-title"]}>
          <h2>모임 소개</h2>
          <div className={styles.line}></div>
        </div>
        <div className={styles.teamintroduction}>
          {teamDetail.teamIntroduction}
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
