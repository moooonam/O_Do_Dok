import React, { useState } from "react";
import styles from "../../styles/UserPasswordUpdate.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function UserPasswordUpdatePage() {
  const movePage = useNavigate();
  function goMyPage() {
    movePage("/mypage");
  }
  // setForm 일단 빼놨음!!
  const [form] = useState({
    now_password: "",
    new_password: "",
    new_password_confirm: "",
  });
  return (
    <div className={styles["passwordupdate-container"]}>
      <h2>Oh Do Dok!</h2>
      <div className={styles["contents-container"]}>
        <h3>비밀번호 변경</h3>
        <div className={styles["contents"]}>
          <div className={styles["now-password"]}>
            <h4>현재 비밀번호</h4>
            <TextField
              sx={{
                width: { md: 250 },
              }}
              required
              id="email"
              label="password"
              value={form.now_password}
              variant="standard"
            />
          </div>
          <br />
          <div className={styles["new-password"]}>
            <h4>새 비밀번호</h4>
            <TextField
              sx={{
                width: { md: 250 },
              }}
              required
              label="new password"
              id="email"
              value={form.new_password}
              variant="standard"
            />
          </div>
          <div className={styles["new-password-confirm"]}>
            <h4>새 비밀번호 확인</h4>
            <TextField
              sx={{
                width: { md: 250 },
              }}
              required
              label="new password confirm"
              id="email"
              value={form.new_password_confirm}
              variant="standard"
            />
          </div>
        </div>
        <div className={styles["btns"]}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              goMyPage();
            }}
          >
            취소
          </Button>
          <div className={styles["btn-blank"]}></div>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              goMyPage();
            }}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserPasswordUpdatePage;
