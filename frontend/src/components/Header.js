import React, { useEffect } from "react";
import styles from "../styles/Header.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, getUserInfo } from "../redux/slice/userSlice";
import { Api } from "../Api";
function Header() {
  // 이동 관련
  const dispatch = useDispatch();
  const movePage = useNavigate();
  function goMain() {
    movePage("/");
  }
  function goMyPage() {
    movePage("/mypage");
    const checkbox = document.getElementById("dropdown");
    checkbox.checked = false;
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
    movePage("/myteam/:teamId/main");
    const checkbox = document.getElementById("dropdown");
    checkbox.checked = false;
  }
  function goOpenReviews() {
    movePage("/openreviews");
  }
  function logOut() {
    localStorage.clear();
    dispatch(logout());
    goMain();
  }
  useEffect(() => {
    if (localStorage.getItem("refresh-token")) {
      dispatch(login());
      Api.get("/user/me", {
        headers: {
          "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
          "access-token": `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
        .then((res) => {
          console.log(res);
          dispatch(
            getUserInfo({
              profileImg: res.data.userImage,
              userEmail: res.data.userEmail,
              userNickname: res.data.userNickname,
              userGenre1: res.data.userGenre1,
              userGenre2: res.data.userGenre2,
              userGenre3: res.data.userGenre3,
              userName: res.data.userName,
              userGender: res.data.userGender,
              userFrequency: res.data.userFrequency,
              userOnoff: res.data.userOnoff,
              userRegion: res.data.userRegion,
              userAge: res.data.userAge,
            })
          );
          // console.log(res.data.userImage)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(logout());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 로그인 관련
  const isLogin = useSelector((state) => state.user.isLogin);
  const profileImg = useSelector((state) => state.user.profileImg);

  let profilOrLogin;
  if (isLogin) {
    profilOrLogin = (
      <div className={styles.container}>
        <input
          id="dropdown"
          type="checkbox"
          className={styles["drop-checkbox"]}
        />
        <label className={styles.dropdownLabel} htmlFor="dropdown">
          <div className={styles["userImg-div"]}>
            <img src={profileImg} alt="" />
          </div>
        </label>
        <div className={styles.content}>
          <ul>
            <li onClick={goMyTeam}>나의 모임</li>
            <li onClick={goMyPage}>마이페이지</li>
            <li onClick={logOut}>로그아웃</li>
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
