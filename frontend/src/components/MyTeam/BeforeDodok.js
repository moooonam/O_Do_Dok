import React from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import dodokstyles from "../../styles/MyTeamBeforeDodok.module.scss";

function BeforeDodok() {
  const books = [
    {
      id: 1,
      imgurl:
        "https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg",
    },
    {
      id: 2,
      imgurl:
        "https://image.aladin.co.kr/product/30872/82/cover500/s412832889_1.jpg",
    },
    {
      id: 3,
      imgurl:
        "https://image.aladin.co.kr/product/30818/49/cover500/s072831276_1.jpg",
    },
  ];
  const renderTeamRecomendBook = books.map((book) => {
    return (
      <div key={book.id}>
        <img src={book.imgurl} alt="책" />
        <p>{book.id}</p>
      </div>
    );
  });
  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar />
      <div className={sidestyles.others}>
        <div className={dodokstyles["firstBox"]}>
          <h2>개미들을 위한 추천 도서</h2>
          <div className={dodokstyles["myteam-wrap-bookimg"]}>
            {renderTeamRecomendBook}
          </div>
          <h3 className={dodokstyles["recommend-reason"]}>
            개미들 모임의 78%가 추리소설을 좋아합니다
          </h3>
        </div>
        <div className={dodokstyles["secondBox"]}>
          <div className={dodokstyles["dodokInfo-header"]}>
            <h2 className={dodokstyles["dodokInfo-headerLeft"]}>도독</h2>
            <div className={dodokstyles["startDodokBtn"]}>도독 시작</div>
          </div>
          <hr />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default BeforeDodok;
