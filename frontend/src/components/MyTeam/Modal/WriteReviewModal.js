import * as React from "react";
// import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../../styles/MyTeamAfterDodok.module.scss";
// import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Api } from "../../../Api";
export default function WriteReviewModal() {
  const [open, setOpen] = React.useState(false);

  const [form, setForm] = React.useState({
    bookRating: 2.5,
    content: "",
    genreRating: 5,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      bookRating: 2.5,
      content: "",
      genreRating: 5,
    });
  };
  const allow = () => {
    Api.post("/dodok/endReview/add", form, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      if (res.data === "이미 작성하셨습니다.") {
        alert("이미 총평을 작성하셨습니다");
        handleClose();
      } else {
        alert("총평 작성이 완료되었습니다!");
        window.location.reload();
      }
    });
  };

  return (
    <div>
      <div className={styles["default-btn"]} onClick={handleClickOpen}>
        총평작성
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">총평 작성</DialogTitle>
        <DialogContent>
          <div className={styles["rating-container"]}>
            <p className={styles["rating-text"]}>별점</p>
            <Rating
              name="simple-controlled"
              precision={0.5}
              value={Number(form.bookRating)}
              onChange={(event) => {
                setForm({ ...form, bookRating: Number(event.target.value) });
              }}
            />
          </div>
          <div className={styles["review-text"]}>리뷰</div>
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
