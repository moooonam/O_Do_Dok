import React, { useState } from "react";
import styles from "../styles/Sidebar.module.scss";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const [status, setStatus] = useState({
    main: false,
    dodok: false,
    article: false,
    record: false,
    teamManage: false,
    memberManage: false,
  });
  const movePage = useNavigate();
  function goMyTeamMain() {
    setStatus({
      ...status,
      main: true,
      dodok: false,
      article: false,
      record: false,
      teamManage: false,
      memberManage: false,
    });
    movePage("/myteammain");
  }
  function goMyTeamDodok() {
    setStatus({
      ...status,
      main: false,
      dodok: true,
      article: false,
      record: false,
      teamManage: false,
      memberManage: false,
    });
    movePage("/myteamdodok");
  }
  function goMyTeamArticle() {
    setStatus({
      ...status,
      main: false,
      dodok: false,
      article: true,
      record: false,
      teamManage: false,
      memberManage: false,
    });
    movePage("/myteamarticle");
  }

  function goMyTeamRecord() {
    setStatus({
      ...status,
      main: false,
      dodok: false,
      article: false,
      record: true,
      teamManage: false,
      memberManage: false,
    });
    movePage("/myteamrecord");
  }

  function goMyTeamManage() {
    setStatus({
      ...status,
      main: false,
      dodok: false,
      article: false,
      record: false,
      teamManage: true,
      memberManage: false,
    });
    movePage("/myteam/manage");
  }

  function goMyTeamMemberManage() {
    setStatus({
      ...status,
      main: false,
      dodok: false,
      article: false,
      record: false,
      teamManage: false,
      memberManage: true,
    });
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
