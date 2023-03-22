import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../../styles/MyTeamAfterDodok.module.scss";

export default function AllPageReviewModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // 페이지 순으로 정렬 필요함
  const pageReviews = [
    {
      id: 1,
      userName: "빵빵이",
      userProfilImg:
        "https://item.kakaocdn.net/do/8d209a3c00ed5f23eeaa3758a1c7d59c7e6f47a71c79378b48860ead6a12bf11",
      page: 150,
      content:
        "어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 ",
    },
    {
      id: 2,
      userName: "채은이",
      userProfilImg:
        "https://mblogthumb-phinf.pstatic.net/MjAxNzA2MTNfMSAg/MDAxNDk3MzI2NTk0Njcx.bs5-ntFT9Fv0PXd1yw_SSphKAYczGEUy7nn8eYqk1Hkg._6H5JZ-4ZVMaXDvjsWNOADSpwMbRNyNsaYwJcZI1ok4g.PNG.dksrnjscjf85/1.png?type=w800",
      page: 75,
      content:
        "어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 ",
    },
    {
      id: 3,
      userName: "빵빵이2",
      userProfilImg:
        "https://image.aladin.co.kr/product/30818/49/cover500/s072831276_1.jpg",
      page: 225,
      content:
        "어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 ",
    },
  ];
  const renderPageReviews = pageReviews.map((pageReview) => {
    return (
      <div className={styles["wrap-allpage-review"]}>
        <div className={styles["wrap-profile"]}>
          <div className={styles["user-img-div"]}>
            <img src={pageReview.userProfilImg} alt="프로필이미지" />
          </div>
          <div className={styles["wrap-review-content"]}>
            <div className={styles["wrap-flex-div"]}>
              <div>{pageReview.userName}</div>
              <div> {pageReview.page} 페이지</div>
            </div>
            <div>{pageReview.content}</div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className={styles["default-btn2"]} onClick={handleClickOpen}>
        전체 페이지 리뷰 보기
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={styles['modal-title']}>전체 페이지 리뷰</DialogTitle>
        <DialogContent>
          {renderPageReviews}
          <div className={styles["wrap-modal-btn"]}>
            <div className={styles["cancle-btn"]} onClick={handleClose}>
              닫기
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
