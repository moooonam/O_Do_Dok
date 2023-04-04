import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import dodokstyles from "../../styles/MyTeamRecordDetail.module.scss";
import RecordDodokBar from "../../components/MyTeam/RecordDodokBar";
import Rating from "@mui/material/Rating";
import RecordAllPageReviewModal from "../../components/MyTeam/Modal/RecordAllPageReviewModal";
import { Api } from "../../Api";
import { useNavigate } from "react-router-dom";

function MyTeamRecordDetail() {
  const movePage = useNavigate();
  const [dodokRecord, setDodokRecord] = useState({
    bookTitle: "",
    bookImg: "",
    bookAuthor: "",
    dodokStartdate:"",
    dodokEnddate:"",
    pageReviews: [],
    endReviews: [],
    dodokOpen: null,
  });
  
  useEffect(() => {
    const dodokRecordId = localStorage.getItem("dodokRecordId");
    Api.get(`/dodok/details/${dodokRecordId}`).then((res) => {
      setDodokRecord({
        ...dodokRecord,
        bookTitle: res.data.dodok.book.bookTitle,
        bookImg: res.data.dodok.book.bookImg,
        bookAuthor: res.data.dodok.book.bookAuthor,
        dodokStartdate: res.data.dodok.dodokStartdate,
        dodokEnddate: res.data.dodok.dodokEnddate,
        pageReviews: res.data.reviewPageList,
        endReviews: res.data.reviewEndList,
        dodokOpen: res.data.dodok.dodokOpen,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dodokRecordId = localStorage.getItem("dodokRecordId");
  
  // 공개로 변경
  const trueDodok = () => {
    Api.put(`/dodok/dodokOpen/updateTrue/${dodokRecordId}`, {}, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      window.location.reload()
    });
  }

  // 비공개로 변경
  const falseDodok = () => {
    Api.put(`/dodok/dodokOpen/updateFalse/${dodokRecordId}`, {}, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      window.location.reload() 
    });
  }

  const myTeamId = localStorage.getItem("myTeamId");
  const deleteDodok = () => {
    Api.delete(`/dodok/${dodokRecordId}`)
    .then((res) => {
      alert('도독이 삭제되었습니다')
      movePage(`/myteam/${myTeamId}/record`)
    });

  }
  const renderReview = dodokRecord.endReviews.map((review) => {
    return (
      <div key={review.reviewEndId} className={dodokstyles["wrap-review"]}>
        <div className={dodokstyles["wrap-user-info"]}>
          <div className={dodokstyles["user-img-div"]}>
            <img src={review.user.userImage} alt="프로필이미지" />
          </div>
          <p>{review.user.userNickname}</p>
          <Rating
            name="read-only"
            value={review.reviewEndBookrating}
            className={dodokstyles.rating}
            readOnly
          />
        </div>
        <div className={dodokstyles["review-content"]}>
          {review.reviewEndContent}
        </div>
      </div>
    );
  });

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"record"} />
      <div className={sidestyles.others}>
        <div className={dodokstyles["wrap-content"]}>
          <div className={dodokstyles["default-btn"]} onClick={() => {deleteDodok()}}>삭제</div>
          {dodokRecord.dodokOpen ? <div className={dodokstyles["default-btn"]} onClick={() => {falseDodok()}}>비공개로 전환</div> : <div className={dodokstyles["default-btn"]} onClick={() => {trueDodok()}}>공개로 전환</div> }
          <div className={dodokstyles["wrap-book"]}>
            <div>
              {dodokRecord.bookImg !== "tmp" ? (
                <img src={dodokRecord.bookImg} alt="책" />
              ) : (
                <img
                  src="https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088777__340.png"
                  alt="책"
                />
              )}
            </div>
            <div className={dodokstyles["wrap-bookinfo"]}>
              <div className={dodokstyles["book-info"]}>
                <p>도서명</p>
                <p>{dodokRecord.bookTitle}</p>
              </div>
              <div className={dodokstyles["book-info"]}>
                <p>저자</p>
                <p>{dodokRecord.bookAuthor}</p>
              </div>
              <div className={dodokstyles["book-info"]}>
                <p>도독기간</p>
                <p>
                  {dodokRecord.dodokStartdate} ~{" "}
                  {dodokRecord.dodokEnddate}
                </p>
              </div>
            </div>
          </div>
          <RecordAllPageReviewModal/>
          <RecordDodokBar propPageReviews={dodokRecord.pageReviews} />
          <div className={dodokstyles["wrap-reviews-title"]}>
            <h3>총평</h3>
          </div>
          {renderReview}
        </div>
      </div>
    </div>
  );
}

export default MyTeamRecordDetail;
