import React, { useState, useEffect } from "react";
import styles from "../../styles/Main.module.scss";
import { Api } from "../../Api";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function RecomendBook() {
  const [best5Book, setBest5Book] = useState([]);
  useEffect(() => {
    Api.get("/book/bestBook").then((res) => {
      console.log("추천도서", res);
      const recomendBook = [...res.data];
      let newBook = [];
      while (recomendBook.length > 15) {
        let movenum = recomendBook.splice(
          Math.floor(Math.random() * recomendBook.length),
          1
        )[0];
        newBook.push(movenum);
      }
      setBest5Book([...newBook]);
      console.log(best5Book);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const handleClickOpen = (book) => {
    // console.log("왔냐", book);
    setSelectedBook({ ...book });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderRecomendBook = best5Book.map((book) => {
    return (
      <div key={book.bookId}>
        <img
          src={book.bookImg}
          alt="책"
          onClick={() => handleClickOpen(book)}
        />
      </div>
    );
  });
  return (
    <div className={styles["wrap-recomendbook"]}>
      <div className={styles["recomendbook-title"]}>오늘의 추천 도서</div>
      <div className={styles["wrap-bookimg"]}>{renderRecomendBook}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='xl'
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"오도독이 추천하는 책이에요📗"}
        </DialogTitle>
        <DialogContent>
          <div>
            {selectedBook ? (
              <div className={styles["one-info"]}>
                <img src={selectedBook.bookImg} alt="" />
                <div>
                  <p>제목 : {selectedBook.bookTitle}</p>
                  <br />
                  <p>작가 : {selectedBook.bookAuthor}</p>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RecomendBook;
