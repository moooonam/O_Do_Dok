import React, { useEffect, useState } from "react";
import styles from "../../styles/MyTeamAfterDodok.module.scss";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import { useSelector } from "react-redux";
import { Api } from "../../Api";

function RecordDodokBar() {
  const [pageReviews, setPageReviews] = useState([]);
  const [bookPage, setBookPage] = useState("");
  const [myId, setMyId] = useState("");
  const [pageReviewInfo, setpageReviewInfo] = useState({
    pageReviewId: "",
    userProfilImg: "",
    page: "",
    userName: "",
    content: "",
    pageReviewUserId: "",
  });
  useEffect(() => {
    const dodokRecordId = localStorage.getItem("dodokRecordId");
    Api.get(`/dodok/details/${dodokRecordId}`).then((res) => {
      // console.log("지난활동 도독", res.data)
      setPageReviews([...res.data.reviewPageList]);
      setBookPage(res.data.dodok.book.bookPagecnt);
    });
    Api.get("/user/me", {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      // console.log('나의정보', res)
      setMyId(res.data.id);
      // console.log(myId)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 동기 비동기가 필요할거같아
  const [pageReviewModal, setpageReviewModal] = React.useState(false);
  const pageReviewModalOpen = () => {
    setpageReviewModal(true);
  };
  const pageReviewModalClose = () => {
    setpageReviewModal(false);
  };
  const clickPage = (pageReview) => {
    console.log(pageReview);
    setpageReviewInfo({
      ...pageReviewInfo,
      pageReviewId: pageReview.reviewPageId,
      page: pageReview.reviewPagePage,
      userName: pageReview.user.userNickname,
      content: pageReview.reviewPageContent,
      pageReviewUserId: pageReview.user.userId,
    });
  };
  const deletePageReview = (pageReviewId) => {
    Api.delete(`/dodok/pageReview/${pageReviewId}`, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      console.log("삭제", res);
      alert("페이지 리뷰를 삭제했습니다.");
      window.location.reload();
    });
  };
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
                {myId === pageReviewInfo.pageReviewUserId ? (
                  <div
                    className={styles["cancle-btn"]}
                    onClick={() => {
                      deletePageReview(pageReviewInfo.pageReviewId);
                    }}
                  >
                    삭제
                  </div>
                ) : null}
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
}

export default RecordDodokBar;
