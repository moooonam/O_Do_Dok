import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import mainstyles from "../../styles/MyTeamMain.module.scss";
import { Api } from "../../Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";

function MyTeamMainPage() {
  const movePage = useNavigate();
  const myTeamId = useSelector((state) => state.user.myTeamId);
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

  const [teamArticle, setTeamArticle] = useState({
    article1: "",
    article2: "",
    article3: "",
  });

  useEffect(() => {
    Api.get("/user/myTeam", {
      headers: {
        "access-token": `Bearer ${access_token}`,
        "refresh-token": `Bearer ${refresh_token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
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
    Api.get("/board", {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        // console.log("최신 게시글 불러오기 완료----------");
        const cnt = res.data.length;
        // console.log(res);
        setTeamArticle({
          ...teamArticle,
          article1: res.data[cnt - 1],
          article2: res.data[cnt - 2],
          article3: res.data[cnt - 3],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const goArticle = (id) => {
  //   movePage(`/myteam/${myTeamId}/article/${id}`)
  // }

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"main"} />
      <div className={sidestyles.others}>
        <div className={mainstyles["myteam-content-box"]}>
          <img
            src={teamDetail.teamImage}
            alt=""
            className={mainstyles["teamImg"]}
          />
          <h2>
            <b>{teamDetail.teamName}</b>
          </h2>
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
              <h3>최신 게시글</h3>
              <div className={mainstyles["myteam-newuser"]}>
                <div className={mainstyles["myteam-newuser-content"]}>
                  <p>{teamArticle.article1.boardTitle}</p>
                  <p>{teamArticle.article2.boardTitle}</p>
                  <p>{teamArticle.article3.boardTitle}</p>
                </div>
                <div className={mainstyles["myteam-newuser-name"]}>
                  {/* <p>{teamArticle.article1.user.userNickname}</p>
                  <p>{teamArticle.article2.user.userNickname}</p>
                  <p>{teamArticle.article2.user.userNickname}</p> */}
                  {/* <p onClick={() => {goArticle(teamArticle.article1.boardId)}}>📃</p>
                  <p onClick={() => {goArticle(teamArticle.article2.boardId)}}>📃</p>
                  <p onClick={() => {goArticle(teamArticle.article3.boardId)}}>📃</p> */}
                </div>
              </div>
            </div>
            <div className={mainstyles["myteam-dodokBox"]}>
              <h3>진행중인 도독</h3>
              <div>
                {teamDetail.ongoingDodok === false ? (
                  <h3 className={mainstyles["myteam-nododok"]}>
                    진행중인 도독이 없습니다!
                  </h3>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTeamMainPage;
