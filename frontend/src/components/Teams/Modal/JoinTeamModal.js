import * as React from "react";
// import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../../styles/TeamDetail.module.scss";
import { Api } from "../../../Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function JoinTeamModal({ teamName }) {
  const movePage = useNavigate();
  const myTeamId = useSelector((state) => state.user.myTeamId);
  const isLogin = useSelector((state) => state.user.isLogin);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    applyMsg: "",
    teamId: "",
  });
  const handleClickOpen = () => {
    if (isLogin) {
      if (myTeamId) {
        alert("이미 모임에 가입되어 있습니다.");
      } else {
        setOpen(true);
        setForm({ ...form, teamId: localStorage.getItem("nowTeam") });
      }
    } else {
      alert("로그인을 해주세요");
      movePage("/login");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      applyMsg: "",
    });
  };
  const allow = () => {
    Api.post("/teams/apply", form, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        if (res.data === '이미 신청한 유저입니다. 신청 불가') {
          alert('이미 신청을 하셨습니다 조금만 기다려주세요')
          handleClose()
        }
        else if (res.data === '신청 성공'){
          alert('가입 신청 성공!')
          handleClose()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className={styles["join-btn"]} onClick={handleClickOpen}>
        가입신청
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Oh Do Dok</DialogTitle>
        <DialogContent>
          <div>하고 싶은 말</div>
          <textarea
            type="textfield"
            className={styles["review-input"]}
            onChange={(e) => setForm({ ...form, applyMsg: e.target.value })}
          />
          <div className={styles["wrap-modal-btn"]}>
            <div onClick={handleClose}>취소</div>
            <div onClick={allow}>신청</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
