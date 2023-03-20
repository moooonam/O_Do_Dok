import React from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import dodokstyles from "../../styles/MyTeamAfterDodok.module.scss";
import DodokBar from "./DodokBar";

function AfterDodok() {
  const testDodokBook = {
    img: "https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg",
    bookName: "춥다",
    startDodok: "2023.03.20",
    endDodok: "2023.03.26",
    genre: ["추리", "스릴러", "판타지"],
  };
  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar/>
      <div className={sidestyles.others}>
        <div className={dodokstyles["wrap-content"]}>
          <div className={dodokstyles["wrap-title"]}>
            <h2>진행중인 도독</h2>
            <div className={dodokstyles["default-btn"]}>도독종료</div>
          </div>
          <div className={dodokstyles["wrap-book"]}>
            <div>
              <img src={testDodokBook.img} alt="책" />
            </div>
            <div className={dodokstyles["wrap-bookinfo"]}>
              <div className={dodokstyles["book-info"]}>
                <p>도서명</p>
                <p>{testDodokBook.bookName}</p>
              </div>
              <div className={dodokstyles["book-info"]}>
                <p>도독기간</p>
                <p>
                  {testDodokBook.startDodok} ~ {testDodokBook.endDodok}
                </p>
              </div>
            </div>
            <div className={dodokstyles.dday}>D-7</div>
          </div>
          <div className={dodokstyles["default-btn"]}>페이지리뷰 작성</div>
          <DodokBar/>
          <div className={dodokstyles["wrap-reviews"]}>
            <h3>총평</h3>
            <div className={dodokstyles["default-btn"]}>총평작성</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AfterDodok;
