import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import dodokstyles from "../../styles/MyTeamAfterDodok.module.scss";
import EndDodokModal from "./Modal/EndDodokModal";
import DodokBar from "./DodokBar";
import WritePageReviewModal from "./Modal/WritePageReviewModal";
import WriteReviewModal from "./Modal/WriteReviewModal";
import Rating from "@mui/material/Rating";
import AllPageReviewModal from "./Modal/AllPageReviewModal";
import { Api } from "../../Api";
import { useSelector } from "react-redux";

function AfterDodok() {
  const [bookDetail, setBookDetail] = useState({
    bookImg : "",
    bookTitle: "",
    dodokStartdate: "",
    dodokEnddate: "",
    dday:'',
  })
  
  
  useEffect(() => {
    Api.get('/dodok/nowdodoks', {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then((res) => {
      localStorage.setItem('dodokId', res.data.dodokId)
      const today = new Date();
      const dday = new Date(`${Number(res.data.dodokEnddate.split('-')[0])}-${Number(res.data.dodokEnddate.split('-')[1])}-${Number(res.data.dodokEnddate.split('-')[2])}`);
      const gap = dday.getTime() - today.getTime();
      const result = Math.ceil(gap/(1000*60*60*24));

      setBookDetail({
        ...bookDetail,
        bookImg: res.data.book.bookImg,
        bookTitle: res.data.book.bookTitle,
        dodokStartdate : res.data.dodokStartdate,
        dodokEnddate : res.data.dodokEnddate,
        dday: result,
      })
    })
    .catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [allReviews, setAllReviews] = useState([])
  useEffect(() => {
    Api.get('/dodok/endReview/list', {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then((res) => {
      if (res.data.length !== 0) {
        setAllReviews([...res.data])
        console.log('총리뷰', res)
      }
    })
  }, [])

  //권한
  const myRole = useSelector((state) => state.user.myRole)
  console.log('롤', myRole)

  const renderReview = allReviews.map((review) => {
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
            precision={0.5}
            readOnly
          />
        </div>
        <div className={dodokstyles['review-content']}>{review.reviewEndContent}</div>
      </div>
    );
  });

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"dodok"}/>
      <div className={sidestyles.others}>
        <div className={dodokstyles["wrap-content"]}>
          <div className={dodokstyles["wrap-title"]}>
            <h2>진행중인 도독</h2>
            {myRole !== 'USER' ? <EndDodokModal /> : null}
            
          </div>
          <div className={dodokstyles["wrap-book"]}>
            <div>
              <img src={bookDetail.bookImg} alt="책" />
            </div>
            <div className={dodokstyles["wrap-bookinfo"]}>
              <div className={dodokstyles["book-info"]}>
                <p>도서명</p>
                <p>{bookDetail.bookTitle}</p>
              </div>
              <div className={dodokstyles["book-info"]}>
                <p>도독기간</p>
                <p>
                  {bookDetail.dodokStartdate} ~ {bookDetail.dodokEnddate}
                </p>
              </div>
            </div>
            <div className={dodokstyles.dday}>D-{bookDetail.dday}</div>
          </div>
          <WritePageReviewModal />
          <AllPageReviewModal/>
          <DodokBar />
          <div className={dodokstyles["wrap-reviews-title"]}>
            <h3>총평</h3>
            <WriteReviewModal />
          </div>
          {allReviews.length !== 0 ? renderReview : null}
        </div>
      </div>
    </div>
  );
}

export default AfterDodok;
