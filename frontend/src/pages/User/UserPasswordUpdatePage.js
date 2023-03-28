import React, { useState } from "react";
import styles from "../../styles/UserPasswordUpdate.module.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Api } from "../../Api";

function UserPasswordUpdatePage() {
  const movePage = useNavigate();
  function goMyPage() {
    movePage("/mypage");
  }
  // setForm 일단 빼놨음!!
  const [form, setForm] = useState({
    now_password: "",
    new_password: "",
    new_password_confirm: "",
  });
  const saveNewPassword = (() =>{
    if (form.new_password !== form.new_password_confirm) {
      alert('비밀번호가 일치하지 않습니다')
      return
    }
    const requestForm = {
      pwd: form.now_password,
      modifyPassword: form.new_password
    }
    Api.put("/user/modifyPassword",requestForm, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then((res) => {
      if (res.data === "수정 완료") {
        alert('비밀번호 변경 성공!')
        goMyPage()
      }
      else {
        alert('현제 비밀번호를 확인해주세요')
      }
    })
    .catch((err) => {
      console.log(err)
    })
    console.log(form)
  })
  const password_validation = () => {
    let check = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    return check.test(form.new_password);
  };
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
              label="password"
              value={form.now_password}
              variant="standard"
              type="password"
              onChange={(e) => setForm({ ...form, now_password: e.target.value })}
              
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
              value={form.new_password}
              variant="standard"
              type="password"
              onChange={(e) => setForm({ ...form, new_password: e.target.value })}
              error={!password_validation() && form.new_password.length > 0}
            helperText={
              !password_validation() && form.new_password.length > 0
                ? "영문, 숫자, 특수문자를 조합하여 8자 이상 16자 이내로 작성해주세요"
                : ""
            }
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
              value={form.new_password_confirm}
              variant="standard"
              type="password"
              onChange={(e) => setForm({ ...form, new_password_confirm: e.target.value })}
              error={
                form.new_password !== form.new_password_confirm &&
                form.new_password_confirm.length > 0
              }
              helperText={
                form.new_password !== form.new_password_confirm &&
                form.new_password_confirm.length > 0
                  ? "비밀번호가 일치하지 않습니다."
                  : ""
              }
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
            onClick={saveNewPassword}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserPasswordUpdatePage;
