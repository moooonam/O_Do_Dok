import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import mainstyles from "../../styles/MyTeamMain.module.scss";
import { Api } from "../../Api";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

function MyTeamMainPage() {
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })}
  // const movePage = useNavigate();
  // const myTeamId = useSelector((state) => state.user.myTeamId);
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
    article1Title: "",
    article1Nickname: "",
    article2Title: "",
    article2Nickname: "",
    article3Title: "",
    article3Nickname: "",
  });

  const [dodokInfo, setDodokInfo] = useState({
    bookImg: "",
    bookTitle: "",
    bookGenre: "",
    dodokStartdate: "",
    dodokEnddate: "",
  });

  useEffect(() => {
    scrollToTop();
    Api.get("/user/myTeam", {
      headers: {
        "access-token": `Bearer ${access_token}`,
        "refresh-token": `Bearer ${refresh_token}`,
      },
    })
      .then((res) => {
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

    Api.get("/dodok/nowdodoks", {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      if (res.data !== '참여한 팀이 없거나 현재 진행중인 도독이 없습니다.'){
        setDodokInfo({ ...dodokInfo,
          bookImg : res.data.book.bookImg,
          bookGenre : res.data.book.bookGenre,
          bookTitle: res.data.book.bookTitle,
          dodokStartdate: res.data.dodokStartdate,
          dodokEnddate: res.data.dodokEnddate,
        });
      }
    });
    Api.get("/board", {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        const cnt = res.data.length;
        if (cnt >= 3) {
          setTeamArticle({
            ...teamArticle,
            article1Title: res.data[cnt - 1].boardTitle,
            article1Nickname: res.data[cnt - 1].user.userNickname,
            article1Board: res.data[cnt-1],
            article2Title: res.data[cnt - 2].boardTitle,
            article2Nickname: res.data[cnt - 2].user.userNickname,
            article3Title: res.data[cnt - 3].boardTitle,
            article3Nickname: res.data[cnt - 3].user.userNickname,

           
          });
        } else if (cnt === 2) {
          setTeamArticle({
            ...teamArticle,
            article1Title: res.data[cnt - 1].boardTitle,
            article1Nickname: res.data[cnt - 1].user.userNickname,
            article2Title: res.data[cnt - 2].boardTitle,
            article2Nickname: res.data[cnt - 2].user.userNickname,
          });
        } else if (cnt === 1) {
          setTeamArticle({
            ...teamArticle,
            article1Title: res.data[cnt - 1].boardTitle,
            article1Nickname: res.data[cnt - 1].user.userNickname,
          });
        } else {
        }
      })


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const myTeamId = localStorage.getItem('myTeamId')
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
            <b>모임정보</b>
          </h2>
          <div className={mainstyles["secondBox"]}>
            <div className={mainstyles["infoBox"]}>
              <div className={mainstyles["myteam-title"]}>
                <p>모임명</p>
                <p>모임원</p>
                {/* <p>모임 시작일</p> */}
                {/* <p>첫 도독</p> */}
              </div>
              <div className={mainstyles["myteam-content"]}>

                <p>{teamDetail.teamName}</p>
                <p>
                  {teamDetail.teamMemberCnt}/{teamDetail.teamMemberCntMax}
                </p>
                {/* <p>2023.03.09</p> */}
                {/* <p>2023.03.15</p> */}
              </div>
            </div>
            <div className={mainstyles["tagBox"]}>
              <div className={mainstyles["onoffRegionBox"]}>
                <div className={mainstyles["myteam-onoff"]}>
                  {teamDetail.teamOnoff === 'ON' ? '온라인' : ( teamDetail.teamOnoff === 'OFF' ? '오프라인' :
                  '온오프라인'
                  )} 
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
              <p>2. {teamDetail.teamRule2}</p>
              <p>3. {teamDetail.teamRule3}</p>
            </div>
          </div>
          <div className={mainstyles["thirdBox"]}>
            <div className={mainstyles["myteam-newuserBox"]}>
              <h3>최신 게시글</h3>
              <div className={mainstyles["myteam-newuser"]}>
                <div className={mainstyles["myteam-newuser-content"]}>
                  {teamArticle.article1Title}
                </div>
                <div className={mainstyles["myteam-newuser-name"]}>
                  {teamArticle.article1Nickname}
                </div>
              </div>
              <div className={mainstyles["myteam-newuser"]}>
                <div className={mainstyles["myteam-newuser-content"]}>
                  {teamArticle.article2Title}
                </div>
                <div className={mainstyles["myteam-newuser-name"]}>
                  {teamArticle.article2Nickname}
                </div>
              </div>
              <div className={mainstyles["myteam-newuser"]}>
                <div className={mainstyles["myteam-newuser-content"]}>
                  {teamArticle.article3Title}
                </div>
                <div className={mainstyles["myteam-newuser-name"]}>
                  {teamArticle.article3Nickname}
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
                      src={dodokInfo.bookImg}
                      alt="도독중 책 이미지"
                      className={mainstyles["dodokBookImg"]}
                    />
                    <div className={mainstyles["myteam-dodok-title"]}>
                      <p>도서명</p>
                      <p>장르</p>
                      <p>도독 시작</p>
                      <p>도독 종료</p>
                    </div>
                    <div className={mainstyles["myteam-dodok-content"]}>
                      <p>{dodokInfo.bookTitle}</p>
                      <p>{dodokInfo.bookGenre}</p>
                      <p>{dodokInfo.dodokStartdate}</p>
                      <p>{dodokInfo.dodokEnddate}</p>
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
