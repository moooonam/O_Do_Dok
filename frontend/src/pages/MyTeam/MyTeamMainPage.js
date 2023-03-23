import React from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import mainstyles from "../../styles/MyTeamMain.module.scss";
function MyTeamMainPage() {
  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"main"}/>
      <div className={sidestyles.others}>
        <div className={mainstyles["myteam-content-box"]}>
          <h4>
            공지 | 다음 도독 시작 예정일을 정하기 위한 게시판입니다 다들 댓글
            달아주세요!
          </h4>
          <img
            src="https://cdn.pixabay.com/photo/2018/05/14/16/54/alpine-3400788_960_720.jpg"
            alt=""
            className={mainstyles["teamImg"]}
          />
          <h2>
            <b>개미들</b>
          </h2>
          <div className={mainstyles["secondBox"]}>
            <div className={mainstyles["infoBox"]}>
              <div className={mainstyles["myteam-title"]}>
                <p>모임원</p>
                <p>모임 시작일</p>
                <p>첫 도독</p>
              </div>
              <div className={mainstyles["myteam-content"]}>
                <p>15/20</p>
                <p>2023.03.09</p>
                <p>2023.03.15</p>
              </div>
            </div>
            <div className={mainstyles["tagBox"]}>
              <div className={mainstyles["onoffRegionBox"]}>
                <div className={mainstyles["myteam-onoff"]}>온라인</div>
                <div className={mainstyles["myteam-region"]}>온라인</div>
              </div>
              <div className={mainstyles["genreBox"]}>
                <div className={mainstyles["myteam-oneGenre"]}>장르</div>
                <div className={mainstyles["myteam-oneGenre"]}>장르</div>
                <div className={mainstyles["myteam-oneGenre"]}>장르</div>
              </div>
            </div>
            <div className={mainstyles["ruleBox"]}>
              <p>1. 팀 규칙 첫번째가 들어갈 자리입니다</p>
              <p>2. 팀 규칙 두번째가 들어갈 자리입니다</p>
              <p>3. 팀 규칙 세번째가 들어갈 자리입니다</p>
            </div>
          </div>
          <div className={mainstyles["thirdBox"]}>
            <div className={mainstyles["myteam-newuserBox"]}>
              <h3>신규 가입 인사</h3>
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
              <h3>진행중인 도독</h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTeamMainPage;
