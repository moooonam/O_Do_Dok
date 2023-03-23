import React, { useState, useEffect } from "react";
import styles from "../styles/Sidebar.module.scss";
import { useNavigate } from "react-router-dom";

const SideBar = ({location}) => {
  const [status, setStatus] = useState({
    main: false,
    dodok: false,
    article: false,
    record: false,
    teamManage: false,
    memberManage: false,
  });
  
  useEffect(() => {
    setStatus({
      ...status,
      [location] : true,
       });
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const movePage = useNavigate();
  function goMyTeamMain() {
    movePage("/myteammain");
  }
  function goMyTeamDodok() {
    movePage("/myteamdodok");
  }
  function goMyTeamArticle() {
    movePage("/myteamarticle");
  }

  function goMyTeamRecord() {
    movePage("/myteamrecord");
  }

  function goMyTeamManage() {
    movePage("/myteam/manage");
  }

  function goMyTeamMemberManage() {
    movePage("/myteam/membermanage");
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles["wrap-sidebar"]}>
        <ul className={styles["sidebar-list"]}>
          <li
            onClick={goMyTeamMain}
            className={status.main ? styles["active"] : styles["notActive"]}
          >
            소식
          </li>
          <li
            onClick={goMyTeamDodok}
            className={status.dodok ? styles["active"] : styles["notActive"]}
          >
            도독
          </li>
          <li
            onClick={goMyTeamArticle}
            className={status.article ? styles["active"] : styles["notActive"]}
          >
            게시판
          </li>
          <li
            onClick={goMyTeamRecord}
            className={status.record ? styles["active"] : styles["notActive"]}
          >
            지난활동
          </li>
          <li
            onClick={goMyTeamManage}
            className={status.teamManage ? styles["active"] : styles["notActive"]}
          >
            모임 관리
          </li>
          <li
            onClick={goMyTeamMemberManage}
            className={status.memberManage ? styles["active"] : styles["notActive"]}
          >
            모임원 관리
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
