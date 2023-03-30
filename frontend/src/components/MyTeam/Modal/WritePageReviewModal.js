import * as React from "react";
// import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../../styles/MyTeamAfterDodok.module.scss";
import { Api } from "../../../Api";
export default function WritePageReviewModal() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    page: "",
    content: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      content: "",
      review: "",
    });
  };
  const allow = () => {
    console.log({ form });
    Api.post('/dodok/pageReview/add', form, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then((res) =>{
      console.log(res)
      alert('페이지리뷰 작성 성공!')
      window.location.reload()
    })
  };

  return (
    <div>
      <div className={styles["default-btn"]} onClick={handleClickOpen}>
        페이지 리뷰 작성
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">페이지 리뷰 작성</DialogTitle>
        <DialogContent>
          <div>
            페이지
            <input
              type="number"
              className={styles["page-input"]}
              onChange={(e) => setForm({ ...form, page: e.target.value })}
            />
          </div>
          <div>리뷰</div>
          <textarea
            type="textfield"
            className={styles["review-input"]}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <div className={styles["wrap-modal-btn"]}>
            <div className={styles["cancle-btn"]} onClick={handleClose}>
              취소
            </div>
            <div className={styles["allow-btn"]} onClick={allow}>
              등록
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
