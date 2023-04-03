import React, { useState, useEffect } from "react";
import styles from "../styles/RecordSideBar.module.scss";
import { Api } from "../Api";

const RecordSideBar = () => {
  const [dodokInfo, setDodokInfo] = useState({
    teamName: "",
    genre1: "",
    genre2: "",
    genre3: "",
  });
  useEffect(() => {
    const dodokRecordId = localStorage.getItem("dodokRecordId");
    Api.get(`/dodok/details/${dodokRecordId}`).then((res) => {
      console.log("도독 상세조회", res.data.dodok);
      setDodokInfo({ ...dodokInfo, 
        teamName: res.data.dodok.team.teamName, 
        genre1: res.data.dodok.team.teamGenre1,
        genre2: res.data.dodok.team.teamGenre2,
        genre3: res.data.dodok.team.teamGenre3,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={styles["wrap-sidebar"]}>
        <div className={styles['side-title']}>모임명</div>
        <div className={styles['side-content']}>{dodokInfo.teamName}</div>
        <div className={styles['side-title']}>모임 선호 장르</div>
        <div>
          <div className={styles['side-content']}>#{dodokInfo.genre1}</div>
          <div className={styles['side-content']}>#{dodokInfo.genre2}</div>
          <div className={styles['side-content']}>#{dodokInfo.genre3}</div>
        </div>
      </div>
    </div>
  );
};

export default RecordSideBar;
