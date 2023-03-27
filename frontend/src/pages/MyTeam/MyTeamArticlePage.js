import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import articlestyles from "../../styles/MyTeamArticle.module.scss";
import { useNavigate } from "react-router-dom";
import { Api } from "../../Api";

function MyTeamArticlePage() {
  const movePage = useNavigate();
  function goArticleCreate() {
    movePage("/myteam/:teamId/article/create");
  }
  const [articles, setArticles] = useState([])

  useEffect(() => {
    Api.get("/board")
      .then((res) => {
        console.log("전체 게시글 불러오기 완료----------");
        // console.log(res.data);
        // console.log(typeof(res.data));
        let newArray = []
        for (let objKey in res.data) {
          if(res.data.hasOwnProperty(objKey)) {
            newArray.push(res.data[objKey]);
          }
        }
        // console.log(newArray)
        setArticles([...newArray])
        console.log(articles)
        // const data =  res.data
        // console.log(data)
        // setArticles([data])
        // console.log(articles)
        // console.log(articles)
      })
      .catch((err) => {
        console.log(err);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderArticles = articles.map((article) => {
    return (
      <div key={article.boardId} className={articlestyles["articleOne"]}>
        <p className={articlestyles["articleType"]}>{article.boardType}</p>
        <p className={articlestyles["articleTitle"]}>
          {article.boardTitle}
        </p>
        <p className={articlestyles["articleUser"]}>{article.user}</p>
      </div>
    );
  });

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"article"} />
      <div className={sidestyles.others}>
        <div className={articlestyles["articles-container"]}>
          <h2>게시판</h2>
          <div className={articlestyles["menuBox"]}>
            <div className={articlestyles["menuLeft"]}>
              <p className={articlestyles["menuOne"]}>전체(27)</p>
              <p className={articlestyles["menuOne"]}>공지사항(12)</p>
              <p className={articlestyles["menuOne"]}>자유게시판(15)</p>
            </div>
            <div
              className={articlestyles["menuRight"]}
              onClick={goArticleCreate}
            >
              +
            </div>
          </div>
          <hr />
          {renderArticles}
        </div>
      </div>
    </div>
  );
}

export default MyTeamArticlePage;
