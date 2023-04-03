import React, { useState, useEffect } from "react";
import openstyles from "../styles/OpenReviews.module.scss";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { lightGreen } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Api } from "../Api";

function OpenReviewsPage() {
  const movePage = useNavigate();
  const [form, setForm] = useState({
    search: "",
  });

  const [menu, setMenu] = useState({
    genre: "추리",
  });
  const options = ["추리", "판타지", "SF", "호러", "무협", "스릴러", "로맨스"];

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
// 공개된 도독들 불러오기
  const [openDodok, setOpenDodok] = useState([])

  useEffect(() => {
    Api.get('/dodok/lastdodoks')
    .then((res) => {
      // console.log('dd',res)
      if (res.data !== '검색 결과가 없습니다.') {
        setOpenDodok([...res.data])
      }
    })

  }, [])
  const [genreBooks, setGenreBooks] = useState([]);

  const clickOption = (option) => {
    setMenu({ ...menu, genre: option });
    setGenreBooks(openDodok.filter((book) => book.dodok.book.bookGenre === menu.genre));
  };
  
  useEffect(() => {
    setGenreBooks(openDodok.filter((book) => book.dodok.book.bookGenre === menu.genre));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genreBooks]);

  // 장르별로 책 보여주기
  const renderBooksByGenre = genreBooks.map((genrebook) => {
    return (
      <div key={genrebook.dodok.dodokId} onClick={() => {goOpenReview(genrebook.dodok.dodokId)}}>
        <p className={openstyles["team-name"]}>"{genrebook.dodok.team.teamName}" 모임</p>
        {genrebook.dodok.book.bookImg !== 'tmp' ? <img src={genrebook.dodok.book.bookImg} alt="책" /> : <img src="https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088777__340.png" alt="책" />}
        <p className={openstyles["book-title"]}>{genrebook.dodok.book.bookTitle}</p>
      </div>
    );
  }); 

  const goOpenReview = (dodokId) => {
    localStorage.setItem("dodokRecordId", dodokId)
    movePage(`/openreviews/${dodokId}`)
  }

  // 전체 장르 책 보여주기 
  const renderBooks =  openDodok.map((book) => {
    return (
      <div key={book.dodok.dodokId} onClick={() => {goOpenReview(book.dodok.dodokId)}}>
        <p className={openstyles["team-name"]}>"{book.dodok.team.teamName}" 모임</p>
        { book.dodok.book.bookImg !== 'tmp' ? <img src={book.dodok.book.bookImg} alt="책" /> : <img src="https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088777__340.png" alt="책" />}
        <p className={openstyles["book-title"]}>{book.dodok.book.bookTitle}</p>
      </div>
    );
  });

  return (
    <div className={openstyles["openreviews-container"]}>
      <div className={openstyles["container-header"]}>
        <h2>오도독 책장</h2>
        <div>
          <TextField
            id="search"
            placeholder="도서제목을 입력해주세요"
            value={form.search}
            variant="standard"
            fullWidth
            onChange={(e) => setForm({ ...form, search: e.target.value })}
          />
          <SearchIcon />
        </div>
      </div>
      <div className={openstyles["books-container"]}>
        <div className={openstyles["books-header"]}>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <ArrowDropDownCircleIcon
              sx={{ color: lightGreen[50] }}
              fontSize="large"
            />
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
                width: "15ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                //   selected={option === "선택"}
                onClick={() => {
                  handleClose();
                  clickOption(option);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <h2>{menu.genre}</h2>
          <div className={openstyles["header-line"]}></div>
        </div>
        <div className={openstyles["book-wrap-bookimg"]}>
          {genreBooks.length !== 0 ? renderBooksByGenre : null}
        </div>
        <div className={openstyles["all-book"]}>
          <h2>모든 리뷰</h2>
          <div className={openstyles["header-line"]}></div>
        </div>
        <div className={openstyles["book-wrap-bookimg"]}>{openDodok.length !== 0 ? renderBooks : null}</div>
      </div>
    </div>
  );
}

export default OpenReviewsPage;
