import React, { useEffect, useState } from "react";
import styles from "../../styles/MyTeamAfterDodok.module.scss";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { Api } from "../../Api";
const DodokBar = () => {
  const [pageReviews, setPageReviews] = useState([])
  const [bookPage, setBookPage] = useState('')
  const [pageReviewInfo, setpageReviewInfo] = useState({
    pageReviewId: "",
    userProfilImg: "",
    page: "",
    userName: "",
    content: "",
    pageReviewUserId: "",
  });
  useEffect(() => {
  Api.get('/dodok/pageReview/list', {
    headers: {
      "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
      "access-token": `Bearer ${localStorage.getItem("access-token")}`,
    },
  })
  .then((res) => {
    if (res.data.length !== 0) {
      // console.log('들어와?')
      setPageReviews([...res.data])
      setBookPage(res.data[0].dodok.book.bookPagecnt)
    }
      // console.log('리뷰조회', res)
  })
  }, []);
  // 동기 비동기가 필요할거같아
  const [pageReviewModal, setpageReviewModal] = React.useState(false);
  const pageReviewModalOpen = () => {
    setpageReviewModal(true);
  };
  const pageReviewModalClose = () => {
    setpageReviewModal(false);
  };
  const clickPage = (pageReview) =>{

    console.log(pageReview)
    setpageReviewInfo({
      ...pageReviewInfo,
      pageReviewId: pageReview.reviewPageId,
      page: pageReview.reviewPagePage,
      userName: pageReview.user.userNickname,
      content: pageReview.reviewPageContent,
      pageReviewUserId: pageReview.user.userId,
    });
  }
  let barLength = window.innerWidth * 0.84 - 150 + 2;
  let reviewBarWidth = window.innerWidth * 0.025;
  const renderPageReview = pageReviews.map((pageReview) => {
    const position = (pageReview.reviewPagePage * barLength) / bookPage;

    const style = {
      marginLeft: `${position - reviewBarWidth}px`,
      position: "absolute",
      zIndex: `${pageReview.reviewPagePage}`,
      width: "5%",
    };
    return (
      <div key={pageReview.reviewPageId} style={style}>
        <div className={styles["userImg-div"]}>
          <img
            src={pageReview.user.userImage}
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
                <div className={styles["cancle-btn"]}>
                  
                </div>
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
        {/* <div className={styles["page-div"]}>{pageReviewInfo.page}</div> */}
      </div>
    );
  });
  return (
    <div className={styles["wrap-bar"]}>
      <div className={styles["standing-line"]}></div>
      <div>{pageReviews ? renderPageReview : null}</div>
      <div className={styles["lying-line"]}></div>
      <div className={styles["standing-line"]}></div>
    </div>
  );
};

export default DodokBar;
