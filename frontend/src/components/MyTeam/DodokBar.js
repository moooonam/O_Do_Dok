import React, {useEffect} from "react";
import styles from "../../styles/MyTeamAfterDodok.module.scss";
function DodokBar() {
  useEffect(() => {
    
  }, [])
  const bookPage = 300;
  const pageReviews = [
    {
      id: 1,
      userName: "빵빵이",
      userProfilImg: "https://item.kakaocdn.net/do/8d209a3c00ed5f23eeaa3758a1c7d59c7e6f47a71c79378b48860ead6a12bf11",
      page: 150,
    },
    {
      id: 2,
      userName: "채은이",
      userProfilImg: "https://mblogthumb-phinf.pstatic.net/MjAxNzA2MTNfMSAg/MDAxNDk3MzI2NTk0Njcx.bs5-ntFT9Fv0PXd1yw_SSphKAYczGEUy7nn8eYqk1Hkg._6H5JZ-4ZVMaXDvjsWNOADSpwMbRNyNsaYwJcZI1ok4g.PNG.dksrnjscjf85/1.png?type=w800",
      page: 145,
    },
    {
      id: 3,
      userName: "빵빵이2",
      userProfilImg: "https://image.aladin.co.kr/product/30818/49/cover500/s072831276_1.jpg",
      page: 155,
    },
  ];
  // let bar = document.querySelector(`.${styles["lying-line"]}`)
  // let barLength = bar.clientWidth
  // console.log(typeof(barLength))
  // const zIndex = 0
  let barLength = (window.innerWidth)*0.84-150 +2
  console.log(barLength)
  let reviewBarWidth = window.innerWidth*0.025
  const renderPageReview = pageReviews.map((pageReview) => {
    const position =  pageReview.page*barLength/bookPage

    const style = {
      marginLeft : `${position- reviewBarWidth}px`,
      position: 'absolute',
      zIndex: `${pageReview.page}`,
      width: '5%',
    }
    return (
        <div key={pageReview.id} style={style}>
          <div className={styles["userImg-div"]}>
            <img src={pageReview.userProfilImg} alt="프로필이미지" />
          </div>
          {/* <div>{pageReview.userName}</div> */}
          <div className={styles["small-standing-line"]}></div>
        </div>
    );
  });
  return (
    <div className={styles["wrap-bar"]}>
      <div className={styles["standing-line"]}></div>
      <div>{renderPageReview}</div>
      <div className={styles["lying-line"]}>
      </div>
      <div className={styles["standing-line"]}></div>
    </div>
  );
}

export default DodokBar;
