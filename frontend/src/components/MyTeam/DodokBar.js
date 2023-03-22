import React, { useEffect, useState } from "react";
import styles from "../../styles/MyTeamAfterDodok.module.scss";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
const DodokBar = ({propPageReviews}) => {
  useEffect(() => {
  }, []);
  const [pageReviewInfo, setpageReviewInfo] = useState({
    page: "",
    userName: "",
    content: "",
  });
  const bookPage = 300;
  const pageReviews = propPageReviews 
  // 동기 비동기가 필요할거같아
  const [pageReviewModal, setpageReviewModal] = React.useState(false);
  const pageReviewModalOpen = () => {
    setpageReviewModal(true);
  };
  const pageReviewModalClose = () => {
    setpageReviewModal(false);
  };
  const clickPage = (pageReview) =>
    setpageReviewInfo({
      ...pageReviewInfo,
      page: pageReview.page,
      userName: pageReview.userName,
      content: pageReview.content,
    });
  let barLength = window.innerWidth * 0.84 - 150 + 2;
  let reviewBarWidth = window.innerWidth * 0.025;
  const renderPageReview = pageReviews.map((pageReview) => {
    const position = (pageReview.page * barLength) / bookPage;

    const style = {
      marginLeft: `${position - reviewBarWidth}px`,
      position: "absolute",
      zIndex: `${pageReview.page}`,
      width: "5%",
    };
    return (
      <div key={pageReview.id} style={style}>
        <div className={styles["userImg-div"]}>
          <img
            src={pageReview.userProfilImg}
            alt="프로필이미지"
            onClick={() => {
              pageReviewModalOpen();
              clickPage(pageReview);
            }}
          />
          <Dialog
            open={pageReviewModal}
            onClose={pageReviewModalClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {pageReviewInfo.userName}님의 {pageReviewInfo.page}페이지 리뷰
            </DialogTitle>
            <DialogContent>
              <div>{pageReviewInfo.content}</div>
              <div className={styles["wrap-modal-btn"]}>
                <div
                  className={styles["cancle-btn"]}
                  onClick={pageReviewModalClose}
                >
                  닫기
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {/* <div>{pageReview.userName}</div> */}
        <div className={styles["small-standing-line"]}></div>
      </div>
    );
  });
  return (
    <div className={styles["wrap-bar"]}>
      <div className={styles["standing-line"]}></div>
      <div>{renderPageReview}</div>
      <div className={styles["lying-line"]}></div>
      <div className={styles["standing-line"]}></div>
    </div>
  );
};

export default DodokBar;
