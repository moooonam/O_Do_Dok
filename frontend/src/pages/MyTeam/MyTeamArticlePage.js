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
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    clickAll: true,
    clickNotice: false,
    clickFree: false,
  });

  useEffect(() => {
    Api.get("/board")
      .then((res) => {
        console.log("전체 게시글 불러오기 완료----------");
        console.log(res.data);

        setArticles(...articles, res.data);
        console.log(articles);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAll = articles.map((article) => {
    return (
      <div key={article.boardId} className={articlestyles["articleOne"]}>
        <p className={articlestyles["articleType"]}>
          {article.boardType.boardType}
        </p>
        <p className={articlestyles["articleTitle"]}>{article.boardTitle}</p>
        <p className={articlestyles["articleUser"]}>{article.user}</p>
      </div>
    );
  });

  const renderNotice = articles.map((article) => {
    if (article.boardType.boardType === "notice") {
      return (
        <div key={article.boardId} className={articlestyles["articleOne"]}>
          <p className={articlestyles["articleType"]}>
            {article.boardType.boardType}
          </p>
          <p className={articlestyles["articleTitle"]}>{article.boardTitle}</p>
          <p className={articlestyles["articleUser"]}>{article.user}</p>
        </div>
      );
    } else {
      return <div></div>;
    }
  });

  const renderFree = articles.map((article) => {
    if (article.boardType.boardType === "free") {
      return (
        <div key={article.boardId} className={articlestyles["articleOne"]}>
          <p className={articlestyles["articleType"]}>
            {article.boardType.boardType}
          </p>
          <p className={articlestyles["articleTitle"]}>{article.boardTitle}</p>
          <p className={articlestyles["articleUser"]}>{article.user}</p>
        </div>
      );
    } else {
      return <div></div>;
    }
  });

  const clickAll = () => {
    setForm({...form, clickAll:true, clickNotice:false, clickFree:false})
  }
  const clickNotice = () => {
    setForm({...form, clickAll:false, clickNotice:true, clickFree:false})
  }
  const clickFree = () => {
    setForm({...form, clickAll:false, clickNotice:false, clickFree:true})
  }

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"article"} />
      <div className={sidestyles.others}>
        <div className={articlestyles["articles-container"]}>
          <h2>게시판</h2>
          <div className={articlestyles["menuBox"]}>
            <div className={articlestyles["menuLeft"]}>
              <p
                className={articlestyles["menuOne"]}
                onClick={() => {clickAll()}}
              >
                전체({articles.length})
              </p>
              <p
                className={articlestyles["menuOne"]}
                onClick={() => {clickNotice()}}
              >
                공지사항
              </p>
              <p
                className={articlestyles["menuOne"]}
                onClick={() => {clickFree()}}
              >
                자유게시판
              </p>
            </div>
            <div
              className={articlestyles["menuRight"]}
              onClick={() => {
                goArticleCreate();
              }}
            >
              +
            </div>
          </div>
          <hr />
          <div className={
                form.clickAll ? articlestyles["active"] : articlestyles["notActive"]
              }>{renderAll}</div>
          <div className={
                form.clickNotice ? articlestyles["active"] : articlestyles["notActive"]
              }>{renderNotice}</div>
          <div className={
                form.clickFree ? articlestyles["active"] : articlestyles["notActive"]
              }>{renderFree}</div>
        </div>
      </div>
    </div>
  );
}

export default MyTeamArticlePage;
