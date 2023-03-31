import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import dodokstyles from "../../styles/MyTeamRecordDetail.module.scss";
import DodokBar from "../../components/MyTeam/DodokBar";
import Rating from "@mui/material/Rating";
import { Api } from "../../Api";
import { useNavigate } from "react-router-dom";

function MyTeamRecordDetail() {
  const movePage = useNavigate();
  const [dodokRecord, setDodokRecord] = useState({
    bookDetail: {},
    pageReviews: [],
    endReviews: [],
    dodokOpen: null,
  });
  

  useEffect(() => {
    const dodokRecordId = localStorage.getItem("dodokRecordId");
    Api.get(`/dodok/details/${dodokRecordId}`).then((res) => {
      console.log("도독 상세조회", res.data);
      setDodokRecord({
        ...dodokRecord,
        bookDetail: res.data.dodok,
        pageReviews: res.data.reviewPageList,
        endReviews: res.data.reviewEndList,
        dodokOpen: res.data.dodok.dodokOpen,
      });
      console.log(dodokRecord);
    });
  }, []);

  const trueDodok = () => {
    const dodokRecordId = localStorage.getItem("dodokRecordId");
    Api.put(`/dodok/dodokOpen/updateTrue/${dodokRecordId}`, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      console.log("공개/비공개", res.data);
    });
  }

  const dodokRecordId = localStorage.getItem("dodokRecordId");
  const falseDodok = () => {
    console.log(dodokRecordId)
    Api.put(`/dodok/dodokOpen/updateFalse/${dodokRecordId}`, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      console.log("공개/비공개", res.data);
    });
  }

  const myTeamId = localStorage.getItem("myTeamId");
  const deleteDodok = () => {
    Api.delete(`/dodok/${dodokRecordId}`)
    .then((res) => {
      console.log(res);
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
            value={review.rating}
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
            {/* <div>
              {dodokRecord.bookDetail.book.bookImg !== "tmp" ? (
                <img src={dodokRecord.bookDetail.book.bookImg} alt="책" />
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
                <p>{dodokRecord.bookDetail.book.bookTitle}</p>
              </div>
              <div className={dodokstyles["book-info"]}>
                <p>도독기간</p>
                <p>
                  {dodokRecord.bookDetail.dodokStartdate} ~{" "}
                  {dodokRecord.bookDetail.dodokEnddate}
                </p>
              </div>
            </div> */}
          </div>
          {/* <DodokBar propPageReviews={dodokRecord.pageReviews} /> */}
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
