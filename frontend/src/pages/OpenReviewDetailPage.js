import React, { useState, useEffect } from "react";
import sidestyles from "../styles/Sidebar.module.scss";
import openreviewtyles from "../styles/OpenReviewDetail.module.scss";
import RecordDodokBar from "../components/MyTeam/RecordDodokBar";
import Rating from "@mui/material/Rating";
import RecordSideBar from "../components/RecordSideBar";
import RecordAllPageReviewModal from "../components/MyTeam/Modal/RecordAllPageReviewModal";
import { Api } from "../Api";

function OpenReviewDetailPage() {
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })}
  const [dodokRecord, setDodokRecord] = useState({
    bookTitle: "",
    bookImg: "",
    bookAuthor: "",
    dodokStartdate: "",
    dodokEnddate: "",
    pageReviews: [],
    endReviews: [],
    dodokOpen: null,
  });

  useEffect(() => {
    scrollToTop();
    const dodokRecordId = localStorage.getItem("dodokRecordId");
    Api.get(`/dodok/details/${dodokRecordId}`).then((res) => {
      // console.log("도독 상세조회", res.data);
      setDodokRecord({
        ...dodokRecord,
        bookTitle: res.data.dodok.book.bookTitle,
        bookImg: res.data.dodok.book.bookImg,
        bookAuthor : res.data.dodok.book.bookAuthor,
        dodokStartdate: res.data.dodok.dodokStartdate,
        dodokEnddate: res.data.dodok.dodokEnddate,
        pageReviews: res.data.reviewPageList,
        endReviews: res.data.reviewEndList,
        dodokOpen: res.data.dodok.dodokOpen,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const renderReview = dodokRecord.endReviews.map((review) => {
    return (
      <div key={review.reviewEndId} className={openreviewtyles["wrap-review"]}>
        <div className={openreviewtyles["wrap-user-info"]}>
          <div className={openreviewtyles["user-img-div"]}>
            <img src={review.user.userImage} alt="프로필이미지" />
          </div>
          <p>{review.user.userNickname}</p>
          <Rating
            name="read-only"
            value={review.reviewEndBookrating}
            className={openreviewtyles.rating}
            readOnly
          />
        </div>
        <div className={openreviewtyles["review-content"]}>
          {review.reviewEndContent}
        </div>
      </div>
    );
  });

  return (
    <div className={sidestyles["myteam-container"]}>
      <RecordSideBar/>
      <div className={sidestyles.others}>
        <div className={openreviewtyles["wrap-content"]}>
          <div className={openreviewtyles["wrap-book"]}>
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
            <div className={openreviewtyles["wrap-bookinfo"]}>
              <div className={openreviewtyles["book-info"]}>
                <p>도서명</p>
                <p>{dodokRecord.bookTitle}</p>
              </div>
              <div className={openreviewtyles["book-info"]}>
                <p>저자</p>
                <p>{dodokRecord.bookAuthor}</p>
              </div>
              <div className={openreviewtyles["book-info"]}>
                <p>도독기간</p>
                <p>
                  {dodokRecord.dodokStartdate} ~ {dodokRecord.dodokEnddate}
                </p>
              </div>
            </div>
          </div>
          <br /><br />
          <h3 className={openreviewtyles["page-review-name"]}>페이지 리뷰 📖</h3>
          <RecordAllPageReviewModal/>
          <RecordDodokBar propPageReviews={dodokRecord.pageReviews} />
          <div className={openreviewtyles["wrap-reviews-title"]}>
            <h3>총평 📔</h3>
          </div>
          {renderReview}
        </div>
      </div>
    </div>
  );
}

export default OpenReviewDetailPage;
