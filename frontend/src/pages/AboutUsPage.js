import React from "react";
import aboutstyles from "../styles/AboutUs.module.scss";

function AboutUsPage() {
  return (
    <div className={aboutstyles["container"]}>
      <div className={aboutstyles["list"]}>
        <div className={aboutstyles["one"]}>
          <h1>O Do Dok!</h1>
          <img
            src="https://media.istockphoto.com/id/1402835350/ko/%EC%82%AC%EC%A7%84/%ED%8E%9C%EC%8B%9C%EB%B8%8C-%ED%8E%B8%EC%95%88%ED%95%9C-%EC%95%84%ED%94%84%EB%A6%AC%EC%B9%B4-%EA%B3%84-%EB%AF%B8%EA%B5%AD%EC%9D%B8-%EC%97%AC%EC%84%B1%EC%9D%B4-%EC%A7%91%EC%97%90%EC%84%9C-%EC%B1%85%EC%9D%84-%EC%9D%BD%EA%B3%A0-%EC%86%8C%ED%8C%8C%EC%97%90-%EC%95%89%EC%95%84-%EC%BB%A4%ED%94%BC%EB%A5%BC-%EB%A7%88%EC%85%A8%EB%8B%A4-%EA%B3%B5%EA%B0%84%EC%9D%84-%EB%B3%B5%EC%82%AC%ED%95%A9%EB%8B%88%EB%8B%A4.jpg?b=1&s=170667a&w=0&k=20&c=JtuCF4YbT551YPanWg6kSlNhSXrMt0v4z46LlJXGXtk="
            alt=""
          />
          {/* <h3>오늘도 독서, 오도독을 소개합니다</h3> */}
          <h3>오늘도 한 걸음 한 걸음, 도전을 위한 독서를 시작합니다.</h3>
          <h3> 독서의 힘으로 강해지는 나, 오도독!</h3>
        </div>
      </div>
      <div className={aboutstyles["list"]}>
        <div className={aboutstyles["two"]}>
          <h2>오도독의 첫 번째 기능</h2>
          <div className={aboutstyles["imgandinfo"]}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/27/13/03/book-2178586__340.jpg"
              alt=""
            />
            <div>
              <h3>선호하는 장르별로 모임에 가입할 수 있습니다.</h3>
              <br />
              <p>
                모임의 태그에 나와있는 모임별 선호 장르를 확인하여 원하는 모임에
                가입해보세요!
              </p>
              <br />
              <p>
                온라인인지 오프라인인지, 오프라인이라면 어디 지역에서 활동하는지
                확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={aboutstyles["list"]}>
        <div className={aboutstyles["three"]}>
          <h2>오도독의 두 번째 기능</h2>
          <div className={aboutstyles["imgandinfo"]}>
            <div>
              <h3>우리 모임만의 도서를 추천받을 수 있어요</h3>
              <br />
              <p>
                우리 모임만의 특성을 통해 맞춤 도서를 빅데이터를 이용해 추천받을
                수 있습니다.
              </p>
              <br />
              <p>
                또한, 모임의 정보를 수정하여 새로운 도서들을 추천받을 수
                있습니다.
              </p>
            </div>
            <img
              src="https://cdn.pixabay.com/photo/2017/12/08/21/33/book-3006768__340.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={aboutstyles["list"]}>
        <div className={aboutstyles["four"]}>
          <h2>오도독의 세 번째 기능</h2>
          <div className={aboutstyles["imgandinfo"]}>
            <img
              src="https://cdn.pixabay.com/photo/2017/02/17/11/02/book-2073828__340.jpg"
              alt=""
            />
            <div>
              <h3>페이지별로 리뷰를 남길 수 있습니다.</h3>
              <br />
              <p>혹시, 도서를 끝까지 읽어야 한다는 부담감이 있진 않으신가요?</p>
              <br />
              <p>
                오도독에서는 도서를 끝까지 읽지 않아도 원하는 페이지에 리뷰를
                남길 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
