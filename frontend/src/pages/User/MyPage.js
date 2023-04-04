import React, {useEffect, useState} from "react";
import styles from "../../styles/MyPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../../Api";

function MyPage() {
  // 이동
  const movePage = useNavigate();
  function goUserInfoUpdate() {
    movePage("/mypage/update");
  }

  function goUserPasswordUpdate() {
    movePage("/mypage/update/password");
  }
  // 유저정보
  const [myTeamName, setMyTeamName] = useState("")
  const [myTeamImg, setMyTeamImg] = useState("")
  const [myPageReviews, setMyPageReviews] = useState([])
  const [myData, setMyData] = useState({
    reviewCnt: 0,
    articleCnt: 0,
    dodokCnt: 0,
  })

  useEffect(() => {
    Api.get("/user/me",{
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },})
      .then((res) => {
        setMyData({ ...myData, reviewCnt : res.data.userReviewcnt, articleCnt : res.data.boardcnt, dodokCnt: res.data.completeDodokCnt})
      })
    .catch((err) => {
      console.log(err)
    })
    Api.get("/user/myTeam",{
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },})
      .then((res) => {
        setMyTeamName(res.data.teamName)
        setMyTeamImg(res.data.teamImage)
      })
    .catch((err) => {
      console.log(err)
    })
    Api.get("/user/showReviewList",{
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },})
      .then((res) => {
        setMyPageReviews(res.data.reviewPageList)
      })
    .catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    const userInfo = useSelector((state) => state.user);

  const renderMyAllPageReview = myPageReviews.map((review) => {
    return (
      <div key={review.dodok.book.bookId} className={styles["review-box"]}>
        { review.dodok.book.bookImg !== "tmp" ? <img src={review.dodok.book.bookImg} alt="책" /> : <img src="https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088777__340.png" alt="책" />}
        
        <div className={styles["review-info"]}>
          <div>
            <div className={styles["book-info"]}>
              <p>[{review.dodok.book.bookTitle}]</p>
              <p>{review.reviewPagePage} 페이지</p>
            </div>
            <p>{review.reviewPageDate}</p>
          </div>
          <p>{review.reviewPageContent}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={styles["mypage-container"]}>
      <h2>마이페이지</h2>
      <div className={styles["myinfo-container"]}>
        <div className={styles["myinfo-left"]}>
          <div className={styles["userImg-div"]}>
            <img
              src={userInfo.profileImg}
              alt=""
            />
          </div>
          <h3>{userInfo.userNickname}</h3>
          <div className={styles["myinfo-update-btns"]}>
            <div      
              onClick={goUserInfoUpdate}
            >
              정보 수정
            </div>
            <div
              onClick={goUserPasswordUpdate}
            >
              비밀번호 변경
            </div>
          </div>
        </div>
        <div className={styles["myinfo-center"]}>
          <div className={styles["center-genre"]}>
            <h4>관심장르</h4>
            <div>#{userInfo.userGenre1}</div>
            <div>#{userInfo.userGenre2}</div>
            <div>#{userInfo.userGenre3}</div>
          </div>
          <div className={styles["center-activity"]}>
            <p>활동 현황</p>
            <div className={styles["activity-box"]}>
              <div className={styles["box-left"]}>{myData.dodokCnt}</div>
              <div className={styles["line"]}></div>
              <div className={styles["box-center"]}>{myData.reviewCnt}</div>
              <div className={styles["line"]}></div>
              <div className={styles["box-right"]}>{myData.articleCnt}</div>
            </div>
            <div className={styles["activity-title"]}>
              <p>완료한 도독</p>
              <p>작성한 리뷰</p>
              <p>작성한 게시글</p>
            </div>
          </div>
        </div>
        <div className={styles["myinfo-right"]}>
          {myTeamName ? <div>
            <h4>가입한 모임</h4>
          <img
            src={myTeamImg}
            alt="팀 대표 이미지"
            /> 
            </div>
            : <div>
            <h4>가입한 모임이 없습니다.</h4>
          <img
            src="https://cdn.pixabay.com/photo/2018/05/31/15/06/see-no-evil-3444212__340.jpg"
            alt="팀 없을때 이미지"
            /> 
            </div>}
            <h3>📚 {myTeamName} 📚</h3>
        </div>
      </div>
      <div className={styles["myinfo-bottom"]}>
        <h3>내가 작성한 글</h3>
        {renderMyAllPageReview}
      </div>
    </div>
  );
}

export default MyPage;
