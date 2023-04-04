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
      const recomendBook = [...res.data];
      let newBook = [];
      while (recomendBook.length > 16) {
        let movenum = recomendBook.splice(
          Math.floor(Math.random() * recomendBook.length),
          1
        )[0];
        newBook.push(movenum);
      }
      setBest5Book([...newBook]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const handleClickOpen = (book) => {
    setSelectedBook({ ...book });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 원래 추천 도서 render
  // const renderRecomendBook = best5Book.map((book) => {
  //   return (
  //     <div key={book.bookId}>
  //       <img
  //         src={book.bookImg}
  //         alt="책"
  //         onClick={() => handleClickOpen(book)}
  //       />
  //     </div>
  //   );
  // });
  const renderRecomendBook = best5Book.map((book) => {
    return (
      <div
        key={book.bookId}
        className={styles["component"]}
        onClick={() => handleClickOpen(book)}
      >
        <ul className={styles["align"]}>
          <li>
            <figure className={styles["book"]}>
              <ul className={styles["hardcover_front"]}>
                <li>
                  <img className={styles["book-img"]}src={book.bookImg} alt="" width="100%" height="100%" />
                </li>
                <li></li>
              </ul>
              <ul className={styles["page"]}>
                <li></li>
                <li><p>책 정보 더보기👆</p></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <ul className={styles["hardcover_back"]}>
                <li></li>
                <li></li>
              </ul>
              <ul className={styles["book_spine"]}>
                <li></li>
                <li></li>
              </ul>
            </figure>
          </li>
        </ul>
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
        maxWidth="xl"
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
