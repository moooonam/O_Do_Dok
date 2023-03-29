import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import detailstyles from "../../styles/ArticleDetail.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CommentIcon from "@mui/icons-material/Comment";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Api } from "../../Api";
import { useSelector } from "react-redux";

function ArticleDetailPage() {
  const userNickname = useSelector((state) => state.user.userNickname);
  const myTeamId = useSelector((state) => state.user.myTeamId)

  const [form, setForm] = useState({
    comment: "",
  });

  const [articleDetail, setArticleDetail] = useState({
    boardType: "",
    boardTitle: "",
    boardContent: "",
    writeUserNickname: "",
  });

  const movePage = useNavigate();
  function goMyTeamArticle() {
    movePage("/myteam/:teamId/article");
  }

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

  function goArticleUpdate() {
    const articleId = localStorage.getItem("articleId");
    movePage(`/myteam/${myTeamId}/article/${articleId}/update`);
  }

  function goArticleDelete() {
    const articleId = localStorage.getItem("articleId");
    Api.delete(`/board/${articleId}`, {headers: {
      "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
      "access-token": `Bearer ${localStorage.getItem("access-token")}`,
    }})
      .then((res) => {
        console.log(res.data);
        alert('게시글이 삭제되었습니다.')
        movePage(`/myteam/${myTeamId}/article`)
      })
      .catch((err) => {
        console.log(err);
      });
  }



  const comments = [
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

  const renderComment = comments.map((comment) => {
    return (
      <div key={comment.id} className={detailstyles["wrap-comment"]}>
        <div className={detailstyles["wrap-user-info"]}>
          <div className={detailstyles["user-img-div"]}>
            <img src={comment.profileImg} alt="프로필이미지" />
          </div>
          <p>{comment.name}</p>
        </div>
        <div className={detailstyles["comment-content"]}>{comment.content}</div>
      </div>
    );
  });

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"article"} />
      <div className={sidestyles.others}>
        <div className={detailstyles["detail-container"]}>
          <ArrowBackIcon onClick={goMyTeamArticle} />
          <div className={detailstyles["inner-container"]}>
            <div className={detailstyles["article-header"]}>
              <div>
                {articleDetail.boardType === "notice" ? (
                  <h4>공지</h4>
                ) : (
                  <h4>자유</h4>
                )}
                <h4>{articleDetail.boardTitle}</h4>
              </div>
              {userNickname === articleDetail.writeUserNickname ? (
                <div>
                  <p onClick={goArticleUpdate}>수정</p>
                  <p onClick={() => {goArticleDelete()}}>삭제</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <p className={detailstyles["article-writer"]}>
              작성자 : {articleDetail.writeUserNickname}
            </p>
            <div className={detailstyles["article-context"]}>
              {articleDetail.boardContent}
            </div>
            <div className={detailstyles["comment-header"]}>
              <p>댓글</p>
              {/* <CommentIcon fontSize="large" /> */}
              <TextField
                multiline
                required
                id="comment"
                value={form.comment}
                variant="standard"
                placeholder=" 내용을 입력해주세요."
                fullWidth
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
              />
              <AddIcon />
            </div>
            {renderComment}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetailPage;
