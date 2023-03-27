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
  useEffect(() => {
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
  }, [])
    const userInfo = useSelector((state) => state.user);
    
  const reviews = [
    {
      id: 1,
      date: "2023.03.09",
      name: "세이노의 가르침",
      page: 72,
      context:
        "페이지 리뷰가 들어갈 자리입니다. 페이지 리뷰가 들어갈 자리입니다. 페이지 리뷰가 들어갈 자리입니다. 페이지 리뷰가 들어갈 자리입니다.",
      imgurl:
        "https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg",
    },
    {
      id: 2,
      date: "2023.03.09",
      name: "제주 탐묘생활",
      page: 25,
      context:
        "페이지 리뷰가 들어갈 자리입니다. 페이지 리뷰가 들어갈 자리입니다. 페이지 리뷰가 들어갈 자리입니다. 페이지 리뷰가 들어갈 자리입니다.",
      imgurl:
        "https://image.aladin.co.kr/product/30872/82/cover500/s412832889_1.jpg",
    },
    {
      id: 3,
      date: "2023.03.09",
      name: "반지의 제왕",
      page: 159,
      context:
        "페이지 리뷰가 들어갈 자리입니다. 페이지 리뷰가 들어갈 자리입니다. 페이지 리뷰가 들어갈 자리입니다. 페이지 리뷰가 들어갈 자리입니다.",
      imgurl:
        "https://image.aladin.co.kr/product/30818/49/cover500/s072831276_1.jpg",
    },
  ];

  const renderMyAllPageReview = reviews.map((review) => {
    return (
      <div key={review.id} className={styles["review-box"]}>
        <img src={review.imgurl} alt="책" />
        <div className={styles["review-info"]}>
          <div>
            <div className={styles["book-info"]}>
              <p>[{review.name}]</p>
              <p>{review.page} 페이지</p>
            </div>
            <p>{review.date}</p>
          </div>
          <p>{review.context}</p>
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
              <div className={styles["box-left"]}>3</div>
              <div className={styles["line"]}></div>
              <div className={styles["box-center"]}>12</div>
              <div className={styles["line"]}></div>
              <div className={styles["box-right"]}>7</div>
            </div>
            <div className={styles["activity-title"]}>
              <p>완료한 도독</p>
              <p>작성한 페이지 리뷰</p>
              <p>작성한 게시글</p>
            </div>
          </div>
        </div>
        <div className={styles["myinfo-right"]}>
          {myTeamName ? <div>
            <h4>가입한 모임 : {myTeamName}</h4>
          <img
            src={myTeamImg}
            alt="팀 대표 이미지"
            /> 
            </div>
            : <h4> 가입한모임이 없습니다</h4>}
        
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
