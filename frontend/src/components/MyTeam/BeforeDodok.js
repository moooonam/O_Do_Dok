import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import dodokstyles from "../../styles/MyTeamBeforeDodok.module.scss";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

// datepicker
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// select
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function BeforeDodok() {
  const [form, setForm] = useState({
    bookName: "",
    author: "",
    genre: "",
    page: "",
    searchWord: "",
  });

  // 도독 시작일
  const [startDate, setStartDate] = React.useState(dayjs());
  const dateFormat1 = dayjs(startDate.$d).format("YYYY-MM-DD");

  // 도독 종료일
  const [endDate, setEndDate] = React.useState(dayjs());
  const dateFormat2 = dayjs(endDate.$d).format("YYYY-MM-DD");

  const books = [
    {
      id: 1,
      imgurl:
        "https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg",
    },
    {
      id: 2,
      imgurl:
        "https://image.aladin.co.kr/product/30872/82/cover500/s412832889_1.jpg",
    },
    {
      id: 3,
      imgurl:
        "https://image.aladin.co.kr/product/30818/49/cover500/s072831276_1.jpg",
    },
  ];
  const renderTeamRecomendBook = books.map((book) => {
    return (
      <div key={book.id}>
        <img src={book.imgurl} alt="책" />
        <p>{book.id}</p>
      </div>
    );
  });

  const startDodok = () => {
    console.log(dateFormat1)
    console.log(dateFormat2)
  }

  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"dodok"}/>
      <div className={sidestyles.others}>
        <div className={dodokstyles["firstBox"]}>
          <h2>개미들을 위한 추천 도서</h2>
          <div className={dodokstyles["myteam-wrap-bookimg"]}>
            {renderTeamRecomendBook}
          </div>
          <h3 className={dodokstyles["recommend-reason"]}>
            개미들 모임의 78%가 추리소설을 좋아합니다
          </h3>
        </div>
        <div className={dodokstyles["secondBox"]}>
          <div className={dodokstyles["dodokInfo-header"]}>
            <h2 className={dodokstyles["dodokInfo-headerLeft"]}>도독</h2>
            <div className={dodokstyles["startDodokBtn"]} onClick={startDodok}>도독 시작</div>
          </div>
          <hr />
          <div className={dodokstyles["dodokInfo-content"]}>
            <div className={dodokstyles["content-left"]}>
              <div className={dodokstyles["left-bookname"]}>
                <p>도서</p>
                <input
                  type="text"
                  value={form.bookName}
                  onChange={(e) =>
                    setForm({ ...form, bookName: e.target.value })
                  }
                />
              </div>
              <div className={dodokstyles["left-genre"]}>
                <p>장르</p>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <Select
                    value={form.genre}
                    onChange={(e) =>
                      setForm({ ...form, genre: e.target.value })
                    }
                    autoWidth
                  >
                    <MenuItem value={1}>추리</MenuItem>
                    <MenuItem value={2}>판타지</MenuItem>
                    <MenuItem value={3}>SF</MenuItem>
                    <MenuItem value={4}>호러</MenuItem>
                    <MenuItem value={5}>무협</MenuItem>
                    <MenuItem value={6}>스릴러</MenuItem>
                    <MenuItem value={7}>로맨스</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={dodokstyles["left-startdate"]}>
                <p>시작</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className={dodokstyles["content-right"]}>
              <div className={dodokstyles["right-author"]}>
                <p>저자</p>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>
              <div className={dodokstyles["right-page"]}>
                <p>총 페이지</p>
                <input
                  type="text"
                  value={form.page}
                  onChange={(e) => setForm({ ...form, page: e.target.value })}
                />
              </div>
              <div className={dodokstyles["right-enddate"]}>
                <p>종료</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
        <div className={dodokstyles["thirdBox"]}>
          <div className={dodokstyles["search-header"]}>
            <h2>도서 검색</h2>
            <div className={dodokstyles["search-bar"]}>
              <TextField
                placeholder="도서명을 입력해주세요"
                value={form.searchWord}
                variant="standard"
                onChange={(e) =>
                  setForm({ ...form, searchWord: e.target.value })
                }
              />
              <SearchIcon />
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default BeforeDodok;
