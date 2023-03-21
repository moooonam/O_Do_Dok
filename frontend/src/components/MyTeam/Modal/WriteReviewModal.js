import * as React from "react";
// import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../../styles/MyTeamAfterDodok.module.scss";
// import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function WriteReviewModal() {
  const [open, setOpen] = React.useState(false);

  const [form, setForm] = React.useState({
    rating: 2.5,
    review: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      rating: 2.5,
      review: "",
    });
  };
  const allow = () => {
    console.log(form)
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
          <div>
            별점
            <Rating
              name="simple-controlled"
              precision={0.5}
              value={Number(form.rating)}
              onChange={(event) => {
                setForm({ ...form, rating: Number(event.target.value) })
              }}
            />
          </div>
          <div>리뷰</div>
          <textarea
            type="textfield"
            className={styles["review-input"]}
            onChange={(e) => setForm({ ...form, review: e.target.value })}
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
