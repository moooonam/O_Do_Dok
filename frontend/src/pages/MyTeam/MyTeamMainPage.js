import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import mainstyles from "../../styles/MyTeamMain.module.scss";
import { Api } from "../../Api";

function MyTeamMainPage() {
  const access_token = localStorage.getItem("access-token");
  const refresh_token = localStorage.getItem("refresh-token");

  const [teamDetail, setTeamDetail] = useState({
    teamName: "",
    teamMemberCnt: "",
    teamMemberCntMax: "",
    teamImage: "",
    teamGenre1: "",
    teamGenre2: "",
    teamGenre3: "",
    teamOnoff: "",
    teamRegion: "",
    teamRule1: "",
    teamRule2: "",
    teamRule3: "",
    teamRecruitText: "",
    ongoingDodok: false,
  });

  useEffect(() => {
    Api.get("/user/myTeam", {
      headers: {
        "access-token": `Bearer ${access_token}`,
        "refresh-token": `Bearer ${refresh_token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setTeamDetail({
          ...teamDetail,
          teamName: res.data.teamName,
          teamMemberCnt: res.data.teamMemberCnt,
          teamMemberCntMax: res.data.teamMemberCntMax,
          teamImage: res.data.teamImage,
          teamGenre1: res.data.teamGenre1,
          teamGenre2: res.data.teamGenre2,
          teamGenre3: res.data.teamGenre3,
          teamOnoff: res.data.teamOnoff,
          teamRegion: res.data.teamRegion,
          teamRule1: res.data.teamRule1,
          teamRule2: res.data.teamRule2,
          teamRule3: res.data.teamRule3,
          teamRecruitText: res.data.teamRecruitText,
          ongoingDodok: res.data.ongoingDodok,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"main"} />
      <div className={sidestyles.others}>
        <div className={mainstyles["myteam-content-box"]}>
          <h4>
            공지 | 다음 도독 시작 예정일을 정하기 위한 게시판입니다 다들 댓글
            달아주세요!
          </h4>
          <img
            src={teamDetail.teamImage}
            alt=""
            className={mainstyles["teamImg"]}
          />
          <h1>
            <b>{teamDetail.teamName}</b>
          </h1>
          <div className={mainstyles["secondBox"]}>
            <div className={mainstyles["infoBox"]}>
              <div className={mainstyles["myteam-title"]}>
                <p>모임원</p>
                <p>모임 시작일</p>
                <p>첫 도독</p>
              </div>
              <div className={mainstyles["myteam-content"]}>
                <p>
                  {teamDetail.teamMemberCnt}/{teamDetail.teamMemberCntMax}
                </p>
                <p>2023.03.09</p>
                <p>2023.03.15</p>
              </div>
            </div>
            <div className={mainstyles["tagBox"]}>
              <div className={mainstyles["onoffRegionBox"]}>
                <div className={mainstyles["myteam-onoff"]}>
                  {teamDetail.teamOnoff}
                </div>
                <div className={mainstyles["myteam-region"]}>
                  {teamDetail.teamRegion}
                </div>
              </div>
              <div className={mainstyles["genreBox"]}>
                <div className={mainstyles["myteam-oneGenre"]}>
                  {teamDetail.teamGenre1}
                </div>
                <div className={mainstyles["myteam-oneGenre"]}>
                  {teamDetail.teamGenre2}
                </div>
                <div className={mainstyles["myteam-oneGenre"]}>
                  {teamDetail.teamGenre3}
                </div>
              </div>
            </div>
            <div className={mainstyles["ruleBox"]}>
              <p>1. {teamDetail.teamRule1}</p>
              <p>2. {teamDetail.teamRule1}</p>
              <p>3. {teamDetail.teamRule1}</p>
            </div>
          </div>
          <div className={mainstyles["thirdBox"]}>
            <div className={mainstyles["myteam-newuserBox"]}>
              <h2>신규 가입 인사</h2>
              <div className={mainstyles["myteam-newuser"]}>
                <div className={mainstyles["myteam-newuser-content"]}>
                  <p>신규 가입자의 인사말이 들어갈 자리입니다</p>
                  <p>신규 가입자의 인사말이 들어갈 자리입니다</p>
                  <p>신규 가입자의 인사말이 들어갈 자리입니다</p>
                </div>
                <div className={mainstyles["myteam-newuser-name"]}>
                  <p>사용자</p>
                  <p>사용자</p>
                  <p>사용자</p>
                </div>
              </div>
            </div>
            <div className={mainstyles["myteam-dodokBox"]}>
              <h2>진행중인 도독</h2>
              <div>
                { teamDetail.ongoingDodok === false
                ? <h3 className={mainstyles["myteam-nododok"]}>진행중인 도독이 없습니다!</h3>
                :
                <div className={mainstyles["myteam-dodok"]}>
                  <img
                    src="https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg"
                    alt=""
                    className={mainstyles["dodokBookImg"]}
                  />
                  <div className={mainstyles["myteam-dodok-title"]}>
                    <p>도서명</p>
                    <p>장르</p>
                    <p>도독 시작</p>
                    <p>도독 종료</p>
                  </div>
                  <div className={mainstyles["myteam-dodok-content"]}>
                    <p>책 이름</p>
                    <p>장르 자리</p>
                    <p>2023.03.09</p>
                    <p>2023.03.15</p>
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTeamMainPage;
