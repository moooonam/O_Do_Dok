import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../../styles/MyTeamAfterDodok.module.scss";
import { Api } from "../../../Api";
export default function RecordAllPageReviewModal() {
  const [open, setOpen] = React.useState(false);
  const [pageReviews, setPageReviews] = React.useState([])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const dodokRecordId = localStorage.getItem("dodokRecordId");
    Api.get(`/dodok/details/${dodokRecordId}`).then((res) => {
      // console.log("지난활동 도독", res.data)
      setPageReviews([...res.data.reviewPageList]);
    });
    }, []);
  const sortedPageReviews = pageReviews.sort((a,b) => a.reviewPagePage - b.reviewPagePage)
  // console.log('정렬됨?' ,sortedPageReviews)
  const renderPageReviews = sortedPageReviews.map((pageReview) => {
    // console.log('여기여기', pageReview)
    return (
      <div key={pageReview.reviewPageId} className={styles["wrap-allpage-review"]}>
        <div className={styles["wrap-profile"]}>
          <div className={styles["user-img-div"]}>
            <img src={pageReview.user.userImage} alt="프로필이미지" />
          </div>
          <div className={styles["wrap-review-content"]}>
            <div className={styles["wrap-flex-div"]}>
              <div>{pageReview.user.userNickname}</div>
              <div className={styles['flex-bok']}> 
                <div>
                {pageReview.reviewPagePage} 페이지
                </div>       
              </div>
            </div>
            <div>{pageReview.reviewPageContent}</div>
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
          {pageReviews ? renderPageReviews : null}
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
