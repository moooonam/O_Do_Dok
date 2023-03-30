import React, { useState, useEffect } from "react";
import openstyles from "../styles/OpenReviews.module.scss";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import { lightGreen } from "@mui/material/colors";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function OpenReviewsPage() {
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

  const books = [
    {
      id: 1,
      name: "책 이름",
      genre: "추리",
      team: "오도독짱",
      imgurl:
        "https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg",
    },
    {
      id: 2,
      name: "책 이름",
      genre: "판타지",
      team: "오도독짱",
      imgurl:
        "https://image.aladin.co.kr/product/30872/82/cover500/s412832889_1.jpg",
    },
    {
      id: 3,
      name: "책 이름",
      genre: "호러",
      team: "오도독짱",
      imgurl:
        "https://image.aladin.co.kr/product/30818/49/cover500/s072831276_1.jpg",
    },
    {
      id: 4,
      name: "책 이름",
      genre: "SF",
      team: "오도독짱",
      imgurl:
        "https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg",
    },
    {
      id: 5,
      name: "책 이름",
      genre: "로맨스",
      team: "오도독짱",
      imgurl:
        "https://image.aladin.co.kr/product/30872/82/cover500/s412832889_1.jpg",
    },
    {
      id: 6,
      name: "책 이름",
      genre: "스릴러",
      team: "오도독짱",
      imgurl:
        "https://image.aladin.co.kr/product/30818/49/cover500/s072831276_1.jpg",
    },
    {
      id: 7,
      name: "책 이름",
      genre: "무협",
      team: "오도독짱",
      imgurl:
        "https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg",
    },
    {
      id: 8,
      name: "책 이름",
      genre: "무협",
      team: "오도독짱",
      imgurl:
        "https://image.aladin.co.kr/product/30872/82/cover500/s412832889_1.jpg",
    },
    {
      id: 9,
      name: "책 이름",
      genre: "스릴러",
      team: "오도독짱",
      imgurl:
        "https://image.aladin.co.kr/product/30818/49/cover500/s072831276_1.jpg",
    },
  ];

  const [genreBooks, setGenreBooks] = useState([]);

  const clickOption = (option) => {
    setMenu({ ...menu, genre: option });
    setGenreBooks(books.filter((book) => book.genre === menu.genre));
  };
  
  useEffect(() => {
    setGenreBooks(books.filter((book) => book.genre === menu.genre));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genreBooks]);

  // 장르별로 책 보여주기
  const renderBooksByGenre = genreBooks.map((genrebook) => {
    return (
      <div key={genrebook.id}>
        <img src={genrebook.imgurl} alt="책" />
        <p>{genrebook.team}</p>
      </div>
    );
  });

  // 전체 장르 책 보여주기
  const renderBooks = books.map((book) => {
    return (
      <div key={book.id}>
        <img src={book.imgurl} alt="책" />
        <p>{book.team} 모임</p>
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
          {renderBooksByGenre}
        </div>
        <div className={openstyles["all-book"]}>
          <h2>모든 리뷰</h2>
          <div className={openstyles["header-line"]}></div>
        </div>
        <div className={openstyles["book-wrap-bookimg"]}>{renderBooks}</div>
      </div>
    </div>
  );
}

export default OpenReviewsPage;
