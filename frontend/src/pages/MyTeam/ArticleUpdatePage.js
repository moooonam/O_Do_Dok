import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import updatestyles from "../../styles/ArticleUpdate.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Api } from "../../Api";
import { useSelector } from "react-redux";



function ArticleUpdatePage() {
  const myTeamId = useSelector((state) => state.user.myTeamId)

  const movePage = useNavigate();
  function goMyTeamArticle() {
    movePage("/myteam/:teamId/article");
  }

  const [articleDetail, setArticleDetail] = useState({
    boardType: "",
    boardTitle: "",
    boardContent: "",
    writeUserNickname: "",
  });

  useEffect(() => {
    const articleId = localStorage.getItem("articleId");
    Api.get(`/board/details/${articleId}`, articleId)
      .then((res) => {
        console.log(res.data);
        setArticleDetail({
          ...articleDetail,
          boardType: res.data.boardType,
          boardContent: res.data.boardContent,
          boardTitle: res.data.boardTitle,
          writeUserNickname: res.data.user.userNickname,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    // axios 보낼 데이터
    const article = {
      // boardType: "", 
      title : "",
      content: "",
      // boardId : localStorage.getItem("articleId"),
    }

  // 게시글 수정
  const articleUpdate = () => {
    const articleId = localStorage.getItem("articleId");
    article.title = articleDetail.boardTitle
    article.content = articleDetail.boardContent

    if (article.boardType === "분류") {
      alert('분류를 선택해주세요')
    } else {
      console.log(article)
      Api.put(`/board/${articleId}`, article, {headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      }})
      .then((res) => {
        console.log(res)
        alert('수정이 완료되었습니다')
        movePage(`/myTeam/${myTeamId}/article/${articleId}`)

      })
      .catch((err) => {
        console.log(err)
      })
    }

  }
  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"article"}/>
      <div className={sidestyles.others}>
        <div className={updatestyles["write-container"]}>
          <ArrowBackIcon onClick={goMyTeamArticle} className={updatestyles["go-back"]}/>
          <div className={updatestyles["inner-container"]}>
            <div className={updatestyles["article-header"]}>
              {articleDetail.boardType === 'notice' ? <h3>공지</h3> : <h3>자유</h3>}
              <TextField
                multiline
                required
                id="title"
                value={articleDetail.boardTitle}
                variant="standard"
                placeholder=" 제목을 입력해주세요."
                fullWidth
                onChange={(e) => setArticleDetail({ ...articleDetail, boardTitle: e.target.value })}
              />
            </div>
            <p className={updatestyles["article-writer"]}>작성자 : {articleDetail.writeUserNickname}</p>
            <textarea
              className={updatestyles["article-context"]}
              type="text"
              value={articleDetail.boardContent}
              onChange={(e) => setArticleDetail({ ...articleDetail, boardContent: e.target.value })}
            />
            <div className={updatestyles["save-btn-box"]}>
              <div></div>
              <Button
                className={updatestyles["article-save"]}
                variant="contained"
                color="success"
                onClick={() => {articleUpdate();}}
              >
                수정
              </Button>
              <div></div>
            </div>
            <br /><br />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleUpdatePage