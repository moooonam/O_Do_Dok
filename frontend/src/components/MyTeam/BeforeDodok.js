import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import sidestyles from "../../styles/Sidebar.module.scss";
import dodokstyles from "../../styles/MyTeamBeforeDodok.module.scss";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// datepicker
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// select
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//검색
import { Api } from "../../Api";
import BookSearchList from "./BookSearchList";

import { useSelector } from "react-redux";

function BeforeDodok() {
  const myRole = useSelector((state) => state.user.myRole)
  const myTeamId = localStorage.getItem('myTeamId')
  const [teamName, setTeamName] = useState('')
  const [recommandBook, setRecommandBook] = useState([])
  const [selectedBook, setSelectedBook] = useState({});
  const [open, setOpen] = useState(false);
  const handleClickOpen = (book) => {
    setSelectedBook({ ...book });
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
  };
  const insertBookData = (()=> {
    hendelCallback(selectedBook)
    setOpen(false)
  })
  useEffect(()=> {
    Api.get("/user/myTeam", {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
    .then((res) => {
      setTeamName(res.data.teamName)
    }) 
    .catch((err) => { 
      console.log(err)
    }) 
    Api.get(`book/recommend/${myTeamId}`)
    .then((res) => {
      const recomendBook = [...res.data];
      let newBook = recomendBook.splice(0,3);
      setRecommandBook([...newBook]);
    })
  } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ,[]) 
  const [form, setForm] = useState({ 
    bookTitle: "",
    author: "",
    genre: "",
    page: "",
    endDate:"",
  });
  // 책 검색
  const [searchKeyword, setSearchKeyword] = useState("")
  const [searchBookData, setSearchBookData] = useState([])
  const hendelCallback = ((selectedBook) => {
    setForm({...form,
    bookTitle: selectedBook.bookTitle,
    author: selectedBook.bookAuthor,
    genre: selectedBook.bookGenre,
    page: selectedBook.bookPagecnt
  })
  })
  const searchBook = (()=> {
    if (searchKeyword) {
      Api.get(`/book/search/${searchKeyword}`)
      .then((res) => {
        if (res.data !== '검색 결과가 없습니다.'){
          setSearchBookData(res.data)
        }
        else {
          alert('검색 결과가 없습니다!')
        }
      })
    }
    else {
      alert('검색어를 입력해주세요')
    }
  })

  const [endDate, setEndDate] = React.useState(dayjs());
  const dateFormat2 = dayjs(endDate.$d).format("YYYY-MM-DD");

  const renderTeamRecomendBook = recommandBook.map((book) => {
    return (
      <div key={book.bookId}>
        <img src={book.bookImg} alt="책" onClick={() => {
              handleClickOpen(book);
            }}/>
        <div className={dodokstyles.booktitle}>{book.bookTitle}</div>
      </div>
    );
  });

  const startDodok = () => {
    const requestForm = {...form,
    endDate: dateFormat2,
    }
    if ( requestForm.bookTitle && requestForm.author && requestForm.genre && requestForm.page && requestForm.endDate) {
      Api.post('/dodok/start', requestForm, {
        headers: {
          "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
          "access-token": `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        alert('도독을 시작합니다!')
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      alert('모든 정보를 입력해야 도독을 시작할 수 있습니다.')
    }
  }

  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      searchBook()
    }
  }
  return (
    <div className={sidestyles["myteam-container"]}>
      <SideBar location={"dodok"}/>
      <div className={sidestyles.others}>
        <div className={dodokstyles["firstBox"]}>
          <h2>'{teamName}' 모임을 위한 추천 도서</h2>
          <div className={dodokstyles["myteam-wrap-bookimg"]}>
            {renderTeamRecomendBook}
          </div>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"선택된 책"}</DialogTitle>
        <DialogContent>
          <div>
            {selectedBook ? (
              <div>
                <p>제목: {selectedBook.bookTitle}</p>
                <br />
                <p>작가: {selectedBook.bookAuthor}</p>
              </div>
            ) : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
          <Button onClick={insertBookData} autoFocus>
            도독에 책정보 넣기
          </Button>
        </DialogActions>
      </Dialog>
          <h3 className={dodokstyles["recommend-reason"]}>
          '{teamName}' 모임의 78%가 추리소설을 좋아합니다
          </h3>
        </div>
        <div className={dodokstyles["secondBox"]}>
          <div className={dodokstyles["dodokInfo-header"]}>
            <h2 className={dodokstyles["dodokInfo-headerLeft"]}>도독</h2>
            {myRole !== 'USER' ? <div className={dodokstyles["startDodokBtn"]} onClick={startDodok}>도독 시작</div> : null}
          </div>
          <hr />
          <div className={dodokstyles["dodokInfo-content"]}>
            <div className={dodokstyles["content-left"]}>
              <div className={dodokstyles["left-bookname"]}>
                <p>도서</p>
                <input
                  type="text"
                  value={form.bookTitle}
                  onChange={(e) =>
                    setForm({ ...form, bookTitle: e.target.value })
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
                    <MenuItem value={'추리/미스터리'}>추리</MenuItem>
                    <MenuItem value={'판타지'}>판타지</MenuItem>
                    <MenuItem value={'SF'}>SF</MenuItem>
                    <MenuItem value={'호러'}>호러</MenuItem>
                    <MenuItem value={'무협'}>무협</MenuItem>
                    <MenuItem value={'스릴러'}>스릴러</MenuItem>
                    <MenuItem value={'로맨스'}>로맨스</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {/* <div className={dodokstyles["left-startdate"]}>
                <p>시작</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                </LocalizationProvider>
              </div> */}
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
                onKeyPress={handleKeyPress}
                onChange={(e) =>
                  setSearchKeyword(e.target.value)
                }
              />
              <SearchIcon onClick={searchBook} className={dodokstyles.searchicon}/>
            </div>
          </div>
          <hr />
        </div>
        <BookSearchList searchBookData={searchBookData} parentCallback={hendelCallback}/>
      </div>
    </div>
  );
}

export default BeforeDodok;
