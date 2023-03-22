import React, { } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import dodokstyles from "../../styles/MyTeamAfterDodok.module.scss";
import EndDodokModal from "./Modal/EndDodokModal";
import DodokBar from "./DodokBar";
import WritePageReviewModal from "./Modal/WritePageReviewModal";
import WriteReviewModal from "./Modal/WriteReviewModal";
import Rating from "@mui/material/Rating";
import AllPageReviewModal from "./Modal/AllPageReviewModal";


function AfterDodok() {
  const testDodokBook = {
    img: "https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg",
    bookName: "춥다",
    startDodok: "2023.03.20",
    endDodok: "2023.03.26",
    genre: ["추리", "스릴러", "판타지"],
  };
  
  const pageReviews =[
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
  ]
  const reviews = [
    {
      id: 1,
      name: "정채은바부",
      profileImg:
        "https://mblogthumb-phinf.pstatic.net/MjAxNzA2MTNfMSAg/MDAxNDk3MzI2NTk0Njcx.bs5-ntFT9Fv0PXd1yw_SSphKAYczGEUy7nn8eYqk1Hkg._6H5JZ-4ZVMaXDvjsWNOADSpwMbRNyNsaYwJcZI1ok4g.PNG.dksrnjscjf85/1.png?type=w800",
      rating: 5,
      content:
        "어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구",
    },
    {
      id: 2,
      name: "독린이",
      profileImg:
        "https://item.kakaocdn.net/do/8d209a3c00ed5f23eeaa3758a1c7d59c7e6f47a71c79378b48860ead6a12bf11",
      rating: 4,
      content:
        "어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구",
    },
  ];
  const renderReview = reviews.map((review) => {
    return (
      <div key={review.id} className={dodokstyles["wrap-review"]}>
        <div className={dodokstyles["wrap-user-info"]}>
          <div className={dodokstyles["user-img-div"]}>
            <img src={review.profileImg} alt="프로필이미지" />
          </div>
          <p>{review.name}</p>
          <Rating
            name="read-only"
            value={review.rating}
            className={dodokstyles.rating}
            readOnly
          />
        </div>
        <div className={dodokstyles['review-content']}>{review.content}</div>
      </div>
    );
  });

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar />
      <div className={sidestyles.others}>
        <div className={dodokstyles["wrap-content"]}>
          <div className={dodokstyles["wrap-title"]}>
            <h2>진행중인 도독</h2>
            <EndDodokModal />
          </div>
          <div className={dodokstyles["wrap-book"]}>
            <div>
              <img src={testDodokBook.img} alt="책" />
            </div>
            <div className={dodokstyles["wrap-bookinfo"]}>
              <div className={dodokstyles["book-info"]}>
                <p>도서명</p>
                <p>{testDodokBook.bookName}</p>
              </div>
              <div className={dodokstyles["book-info"]}>
                <p>도독기간</p>
                <p>
                  {testDodokBook.startDodok} ~ {testDodokBook.endDodok}
                </p>
              </div>
            </div>
            <div className={dodokstyles.dday}>D-7</div>
          </div>
          <WritePageReviewModal />
          <AllPageReviewModal/>
          <DodokBar propPageReviews={pageReviews}/>
          <div className={dodokstyles["wrap-reviews-title"]}>
            <h3>총평</h3>
            <WriteReviewModal />
          </div>
          {renderReview}
        </div>
      </div>
    </div>
  );
}

export default AfterDodok;
