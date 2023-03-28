import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import writestyles from "../../styles/ArticleCreate.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { Api } from "../../Api";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function ArticleCreatePage() {
  const movePage = useNavigate();
  function goMyTeamArticle() {
    movePage("/myteam/:teamId/article");
  }

  const userName = useSelector((state) => state.user.userNickname)
  const userId = useSelector((state) => state.user.userId)

  const [menu, setMenu] = useState({
    choice : "분류",
  })

  const [form, setForm] = useState({
    title: "",
    context: "",
    writer: "",
  });

  const options = ["분류", "공지", "자유"];

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickOption = (option) => {
    // console.log(option)
    setMenu({ ...menu, choice: option})
  }

  // axios 보낼 데이터
  const article = {
    userId: "", 
    boardType: "", 
    title : "",
    content: "",
  }
  const createArticle = () => {
    article.title = form.title
    article.content = form.context
    article.user = userId
    if (menu.choice === '공지') {
      article.boardType = "notice"
    } else if (menu.choice === '자유') {
      article.boardType = "free"
    }

    if (menu.choice === '분류') {
      alert('게시글의 분류를 선택해주세요')
    } else { 
      if (article.title && article.content) {
        Api.post('/board', article)
        .then((res) => {
          console.log(res)
          alert('게시글 작성이 완료되었습니다.')
          movePage('/board')
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        alert('제목 혹은 내용을 입력해주세요')
      }
      }
  }

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"article"}/>
      <div className={sidestyles.others}>
        <div className={writestyles["write-container"]}>
          <ArrowBackIcon onClick={goMyTeamArticle} />
          <div className={writestyles["inner-container"]}>
            <div className={writestyles["article-header"]}>
              <h4>{menu.choice}</h4>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                className={writestyles["dropdown"]}
              >
                <ArrowDropDownCircleIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "10ch",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    //   selected={option === "선택"}
                    onClick={() => {handleClose(); clickOption(option);}}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
              <TextField
                multiline
                required
                id="title"
                value={form.title}
                variant="standard"
                placeholder=" 제목을 입력해주세요."
                fullWidth
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <p className={writestyles["article-writer"]}>작성자 : {userName}</p>
            <textarea
              className={writestyles["article-context"]}
              type="text"
              value={form.context}
              onChange={(e) => setForm({ ...form, context: e.target.value })}
            />
            <div className={writestyles["save-btn-box"]}>
              <div></div>
              <Button
                className={writestyles["article-save"]}
                variant="contained"
                color="success"
                onClick={() => {createArticle()}}
              >
                저장
              </Button>
              <div></div>
            </div>
            <br /><br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCreatePage;
