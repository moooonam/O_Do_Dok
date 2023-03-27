import * as React from "react";
// import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../../styles/TeamDetail.module.scss";
import { Api } from "../../../Api";

export default function JoinTeamModal({teamName}) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    content: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      content: "",
    });
  };
  const allow = () => {
    console.log({ form });
    const Id = localStorage.getItem("nowTeam") 
    const access_token = localStorage.getItem("access-token")
    Api.post(`/teams/${Id}`, form.content,
    {headers: {'access-token': `Bearer ${access_token}`}})
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
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
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <div className={styles["wrap-modal-btn"]}>
            <div onClick={handleClose}>
              취소
            </div>
            <div onClick={allow}>
              신청
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
