// import React, { useState } from "react";
import styles from "../styles/Header.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  // 이동 관련
  const movePage = useNavigate();
  function goMain() {
    movePage("/");
  }
  function goMyPage() {
    movePage("/mypage");
    const checkbox = document.getElementById('dropdown')
    checkbox.checked = false
  }
  function goLogin() {
    movePage("/login");
  }
  function goAboutUs() {
    movePage("/about-us");
  }
  function goTeams() {
    movePage("/teams");
  }
  function goMyTeam() {
    movePage("/myteammain");
    const checkbox = document.getElementById('dropdown')
    checkbox.checked = false
  }
  function goOpenReviews() {
    movePage("/openreviews");
  }
  // 로그인 관련
  const isLogin = useSelector((state) => state.user.isLogin);
  // console.log(isLogin);

  let profilOrLogin;
  if (isLogin) {
    profilOrLogin = (
      <div className={styles.container}>
        <input id="dropdown" type="checkbox" className={styles['drop-checkbox']} />
        <label className={styles.dropdownLabel} htmlFor="dropdown">
          <div>로그인됨</div>
        </label>
        <div className={styles.content}>
          <ul>
            <li onClick={goMyTeam}>나의 모임</li>
            <li onClick={goMyPage}>마이페이지</li>
            <li>로그아웃</li>
          </ul>
        </div>
      </div>
    );
  } else {
    profilOrLogin = (
      <div className={styles["header-login-btn"]} onClick={goLogin}>
        로그인
      </div>
    );
  }
  return (
    <div className={styles["wrap-header"]}>
      <div className={styles["header-logo-btn"]} onClick={goMain}>
        Oh Do Dok!
      </div>
      <div className={styles["wrap-content"]}>
        <div className={styles["header-btn"]} onClick={goAboutUs}>
          소개
        </div>
        <div className={styles["header-btn"]} onClick={goTeams}>
          모임신청
        </div>
        <div className={styles["header-btn"]} onClick={goOpenReviews}>
          오도독 책장
        </div>
      </div>
      {profilOrLogin}
      {/* <div className={styles["header-login-btn"]} onClick={goLogin}>
        로그인
      </div> */}
    </div>
  );
}

export default Header;
