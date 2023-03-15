import React from "react";
import styles from "../styles/Sidebar.module.scss";
import { useNavigate } from "react-router-dom";

function SideBar() {
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
  return (
    <div className={styles.sidebar}>
      <div className={styles["wrap-sidebar"]}>
        <ul className={styles["sidebar-list"]}>
          <li onClick={goMyTeamMain}>
            소식
          </li>
          <li onClick={goMyTeamDodok}>도독</li>
          <li onClick={goMyTeamArticle}>게시판</li>
          <li onClick={goMyTeamRecord}>지난활동</li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
