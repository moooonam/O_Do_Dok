import React, { useEffect, useState } from "react";
import sidestyles from "../../styles/Sidebar.module.scss";
import infostyles from "../../styles/TeamMoreInfo.module.scss";
import { Api } from "../../Api";
import { useNavigate } from "react-router-dom";

function TeamMoreInfo() {
  const movePage = useNavigate();
  const [lastDodoks, setLastDodoks] = useState([]);
  const [teamName, setTeamName] = useState();
  let Id = localStorage.getItem("nowTeam");

  useEffect(() => {
    Api.get(`/dodok/lastdodoks/${Id}`, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      if (res.data !== "검색 결과가 없습니다.") {
        setLastDodoks([...res.data]);
        console.log("지난도독", res.data);
        console.log(lastDodoks);
      }
    });
    Api.get(`/teams/info/${Id}`)
    .then((res) => {
      console.log("팀정보", res)
      setTeamName(res.data.teamName)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goRecordDetail = (dodok) => {
    // console.log("여기");
    localStorage.setItem("dodokRecordId", dodok.dodok.dodokId);
    movePage(`/openreviews/${dodok.dodok.dodokId}`)
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
        <div className={infostyles.booktitle}>
          {dodok.dodok.book.bookTitle}
        </div>
      </div>
    );
  });
  return (
    <div className={sidestyles["myteam-container"]}>
      <div className={sidestyles.others}>
        <div className={infostyles["records-container"]}>
          <h2>{teamName}의 지난활동</h2>
          <div className={infostyles["record-wrap-bookimg"]}>
            {/* {lastDodoks.length === 0 ? <div></div> : {renderLastDodoks}} */}
            {renderLastDodoks}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMoreInfo;
