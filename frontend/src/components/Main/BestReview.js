import React, { useState, useEffect } from 'react'
import styles from '../../styles/Main.module.scss'
import { Api } from '../../Api'
import { useNavigate } from "react-router-dom";

function BestReview() {
  const movePage = useNavigate()
  const [openDodok, setOpenDodok] = useState([])

  useEffect(() => {
    Api.get('/dodok/lastdodoks')
    .then((res) => {
      if (res.data !== '검색 결과가 없습니다.') {
        if (res.data.length >= 6) {
          setOpenDodok([...openDodok, res.data[0], res.data[1], res.data[2],res.data[3], res.data[4]])
        } else {
          setOpenDodok([...res.data])
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goOpenReview = (dodokId) => {
    localStorage.setItem("dodokRecordId", dodokId)
    movePage(`/openreviews/${dodokId}`)
  }
  
  const renderBestReview = openDodok.map(book => {
    return (
      <div key={book.dodok.dodokId} onClick={() => {goOpenReview(book.dodok.dodokId)}}>
        {book.dodok.book.bookImg !== "tmp" ? (
            <img src={book.dodok.book.bookImg} alt="책" />
          ) : (
            <img
              src="https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088777__340.png"
              alt="책"
            />
          )}
          <p className={styles["team-name"]}>"{book.dodok.team.teamName}" 모임</p>
      </div>
    )
  })
  return (
  <div className={styles['wrap-bestreview']}>
    <div className={styles['bestreview-title']}>
    최신 리뷰
    </div>
    <div className={styles['wrap-bookimg'] }>
        {renderBestReview}
      </div>
  </div>
  )
}

export default BestReview