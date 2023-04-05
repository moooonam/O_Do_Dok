import React, { useState } from "react";
import styles from "../../styles/MyTeamBeforeDodok.module.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
function BookSearchList({ searchBookData, parentCallback}) {
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const handleClickOpen = (book) => {
    setSelectedBook({ ...book });
    setOpen(true);
  };

  const insertBookData = (()=> {
    parentCallback(selectedBook)
    setOpen(false)
  })
  const handleClose = () => {
    setOpen(false);
  };
  const renderResult = searchBookData.map((book) => {
    return (
      <div key={book.bookId} className={styles["book-container"]}>
        <div className={styles["wrap-img"]}>
          <img
            src={book.bookImg}
            alt="책"
            onClick={() => {
              handleClickOpen(book);
            }}
          />
        </div>
        <p>{book.bookTitle}</p>
      </div>
    );
  });
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"선택한 도서에 대한 정보 📗"}</DialogTitle>
        <DialogContent>
          <div>
            {selectedBook ? (
              <div className={styles['recommand-choice']}>
                <img src={selectedBook.bookImg} alt="책 이미지" />
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
      {searchBookData.length !== 0 ? (
        <div className={styles["result-container"]}>{renderResult}</div>
      ) : (
        <div className={styles["no-result"]}>검색결과가 없습니다</div>
      )}
    </div>
  );
}

export default BookSearchList;
