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
  const myTeamId = useSelector((state) => state.user.myTeamId);

  const [form, setForm] = useState({
    comment: "",
    updateComment: "",
    updateStatus: false,
    clickComment: "",
  });

  const [articleDetail, setArticleDetail] = useState({
    boardType: "",
    boardTitle: "",
    boardContent: "",
    writeUserNickname: "",
  });

  const [comments, setComments] = useState([]);

  const movePage = useNavigate();
  function goMyTeamArticle() {
    movePage("/myteam/:teamId/article");
  }

  useEffect(() => {
    const articleId = localStorage.getItem("articleId");
    Api.get(`/board/details/${articleId}`, articleId)
      .then((res) => {
        setArticleDetail({
          ...articleDetail,
          boardType: res.data.board.boardType,
          boardContent: res.data.board.boardContent,
          boardTitle: res.data.board.boardTitle,
          writeUserNickname: res.data.board.user.userNickname,
        });
        setComments(res.data.comments);
        setForm({ ...form, updateComment: res.data.comments.commentContent });
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

  const articleId = localStorage.getItem("articleId");
  function goArticleDelete() {
    Api.delete(`/board/${articleId}`, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        alert("게시글이 삭제되었습니다.");
        movePage(`/myteam/${myTeamId}/article`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 댓글 수정 axios에 보낼 데이터
  // const update = {
  //   comment: form.updateComment,
  //   commendId: "",
  // };

  const updateInput = (id) => {
    setForm({ ...form, updateStatus: true, clickComment: id });
  };

  // 댓글 수정
  const commentUpdate = (id) => {
    const update = {
      commentId: id,
      comment: form.updateComment,
    };
    Api.put(
      "/board/comment",
      update,
      {
        headers: {
          "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
          "access-token": `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    )
      .then((res) => {
        setForm({ ...form, updateStatus: false });
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 댓글 삭제
  // const boardId = localStorage.getItem("articleId");
  const deleteComment = (id) => {
    Api.delete(`/board/comment/${id}`, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        alert("댓글이 삭제되었습니다.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderComment = comments.map((comment) => {
    return (
      <div key={comment.commentId} className={detailstyles["wrap-comment"]}>
        <div className={detailstyles["wrap-user-update"]}>
          <div className={detailstyles["wrap-user-info"]}>
            <div className={detailstyles["user-img-div"]}>
              <img src={comment.user.userImage} alt="프로필이미지" />
            </div>
            <p>{comment.user.userNickname}</p>
          </div>
          {userNickname === comment.user.userNickname &&
          form.updateStatus === false ? (
            <div className={detailstyles["comment-update-delete"]}>
              <p onClick={() => updateInput(comment.commentId)}>수정</p>
              <p onClick={() => deleteComment(comment.commentId)}>삭제</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {form.updateStatus && form.clickComment === comment.commentId ? (
          <div className={detailstyles["update-box"]}>
            <TextField
              // multiline
              required
              id="comment"
              variant="standard"
              value={form.updateComment}
              fullWidth
              onChange={(e) =>
                setForm({ ...form, updateComment: e.target.value })
              }
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                    commentUpdate(comment.commentId);
                }
              }}
            />
            <div>
              <p onClick={() => setForm({ ...form, updateStatus: false })}>
                취소
              </p>
              <p
                onClick={() => {
                  commentUpdate(comment.commentId);
                }}
              >
                완료
              </p>
            </div>
          </div>
        ) : (
          <div className={detailstyles["comment-content"]}>
            {comment.commentContent}
          </div>
        )}
      </div>
    );
  });

  // 댓글 생성 axios 보낼 데이터
  const data = {
    comment: "",
    boardId: localStorage.getItem("articleId"),
  };

  // 댓글 생성
  const createComment = () => {
    data.comment = form.comment.split("\n")[0];
    if (data.comment) {
      Api.post("/board/comment", data, {
        headers: {
          "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
          "access-token": `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("댓글을 입력해주세요.");
    }
  };

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
                  <p
                    onClick={() => {
                      goArticleDelete();
                    }}
                  >
                    삭제
                  </p>
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
                // multiline
                required
                id="comment"
                value={form.comment}
                variant="standard"
                placeholder=" 내용을 입력해주세요."
                fullWidth
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    createComment();
                  }
                }}
              />
              <AddIcon
                onClick={() => {
                  createComment();
                }}
              />
            </div>
            {renderComment}
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetailPage;
