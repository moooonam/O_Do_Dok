import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "../../styles/Login.module.scss";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { Api } from "../../Api";
import { useDispatch } from "react-redux";
import { login, getUserInfo, getTeamId } from "../../redux/slice/userSlice";
function LoginPage() {
  const dispatch = useDispatch();
  const movePage = useNavigate();
  const [form, setForm] = useState({
    userEmail: "",
    password: "",
  });

  const goSignup = () => {
    movePage("/signup");
  };
  const goMain = () => {
    movePage("/");
  };
  const userLogin = () => {
    Api.post("/login", form)
      .then((res) => {
        localStorage.setItem("refresh-token", res.data["refresh-token"]);
        localStorage.setItem("access-token", res.data["access-token"]);
        dispatch(login());
        Api.get("/user/me", {
          headers: {
            "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
            "access-token": `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
          .then((res) => {
            console.log(res)
            dispatch(
              getUserInfo({
                profileImg: res.data.userImage,
                userEmail: res.data.userEmail,
                userNickname: res.data.userNickname,
                userPhone: res.data.userPhone,
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
          })
          .catch((err) => {
            console.log(err);
          });
          Api.get("/user/myTeam", {
            headers: {
              "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
              "access-token": `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
          .then((res) => {
            if (res.data) {
              dispatch(getTeamId({ myTeamId:res.data.teamId}))
              localStorage.setItem('myTeamId',res.data.teamId)
            }
          })
          .catch((err) => {
            console.log(err)
          })
        goMain();
      })
      .catch((err) => {
        alert('이메일 혹은 비밀번호를 확인해주세요')
        console.log(err);
      });
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>O Do Dok!</h2>
      <div className={styles["loginBox"]}>
        <h3 className={styles["title"]}>로그인</h3>
        <Grid container direction="row" columnGap={5.5}>
          <p className={styles["login-blank"]}>이메일</p>
          <TextField
            required
            id="userEmail"
            label="Required"
            placeholder="이메일을 입력해주세요"
            value={form.userEmail}
            variant="standard"
            onChange={(e) => setForm({ ...form, userEmail: e.target.value })}
          />
        </Grid>
        <Grid container direction="row" columnGap={4}>
          <p className={styles["login-blank"]}>비밀번호</p>
          <TextField
            required
            type="password"
            id="password"
            label="Required"
            placeholder="비밀번호를 입력해주세요"
            value={form.password}
            variant="standard"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyUp={(e) => {if (e.key === "Enter") {userLogin()}}}
          />
        </Grid>
        <Grid container  >
          {/* <p className={styles["small"]}>아이디/비밀번호 찾기</p> */}
          <p className={styles["small"]} onClick={goSignup}>
            
          </p>
        </Grid>
        <br />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          columnGap={2}
        >
          <Button variant="contained" onClick={goSignup}>회원가입</Button>
          <Button variant="contained" color="success" onClick={userLogin}>
            로그인
          </Button>
        </Grid>
      </div>
    </Grid>
  );
}

export default LoginPage;
