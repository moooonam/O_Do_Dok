import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import recordstyles from "../../styles/MyTeamRecord.module.scss";
import { Api } from "../../Api";
import { useNavigate } from "react-router-dom";

function MyTeamRecordPage() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [teamName, setTeamName] = useState("");
  const movePage = useNavigate();
  const [lastDodoks, setLastDodoks] = useState([]);
  const myTeamId = localStorage.getItem("myTeamId");

  useEffect(() => {
    scrollToTop();
    Api.get(`/dodok/lastdodoks/${myTeamId}`, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      if (res.data !== "검색 결과가 없습니다.") {
        setLastDodoks([...res.data]);
      }
    });
    Api.get("/user/myTeam", {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        setTeamName(res.data.teamName);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goRecordDetail = (dodok) => {
    localStorage.setItem("dodokRecordId", dodok.dodok.dodokId);
    movePage(`/myteam/${myTeamId}/record/${dodok.dodok.dodokId}`);
  };

  const renderLastDodoks = lastDodoks.map((dodok) => {
    return (
      <div
        key={dodok.dodok.dodokId}
        onClick={() => {
          goRecordDetail(dodok);
        }}
      >
        {dodok.dodok.book.bookImg !== "tmp" ? (
          <img src={dodok.dodok.book.bookImg} alt="책" />
        ) : (
          <img
            src="https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088777__340.png"
            alt="책"
          />
        )}
        <div className={recordstyles.booktitle}>
          {dodok.dodok.book.bookTitle}
        </div>
      </div>
    );
  });
  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"record"} />
      <div className={sidestyles.others}>
        <div className={recordstyles["records-container"]}>
          <h2>'{teamName}'의 지난활동</h2>
          <div className={recordstyles["record-wrap-bookimg"]}>
            {/* {lastDodoks.length === 0 ? <div></div> : {renderLastDodoks}} */}
            {renderLastDodoks}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTeamRecordPage;
