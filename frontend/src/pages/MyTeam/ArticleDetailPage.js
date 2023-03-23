import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import detailstyles from "../../styles/ArticleDetail.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CommentIcon from "@mui/icons-material/Comment";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

function ArticleDetailPage() {
  const [form, setForm] = useState({
    comment: "",
  });
  
  const movePage = useNavigate();
  function goMyTeamArticle() {
    movePage("/myteamarticle");
  }

  function goArticleUpdate() {
    movePage("/myteamarticle/update")
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
      <SideBar />
      <div className={sidestyles.others}>
        <div className={detailstyles["detail-container"]}>
          <ArrowBackIcon onClick={goMyTeamArticle} />
          <div className={detailstyles["inner-container"]}>
            <div className={detailstyles["article-header"]}>
              <div>
                <h4>공지</h4>
                <h4>게시글의 제목이 들어갈 자리입니다</h4>
              </div>
              <div>
                <p onClick={goArticleUpdate}>수정</p>
                <p>삭제</p>
              </div>
            </div>
            <p className={detailstyles["article-writer"]}>작성자 : 독린이</p>
            <div className={detailstyles["article-context"]}>
              게시글의 내용이 들어갈 자리입니다. 게시글의 내용이 들어갈
              자리입니다. 게시글의 내용이 들어갈 자리입니다. 게시글의 내용이
              들어갈 자리입니다. 게시글의 내용이 들어갈 자리입니다.{" "}
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
