import React from 'react'
import styles from '../../styles/Main.module.scss'
function BestReview() {
  const books = [
    {
      id:1,
      imgurl:'https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg'
    },
    {
      id:2,
      imgurl:'https://image.aladin.co.kr/product/30872/82/cover500/s412832889_1.jpg'
    },
    {
      id:3,
      imgurl:'https://image.aladin.co.kr/product/30818/49/cover500/s072831276_1.jpg'
    },
    {
      id:4,
      imgurl:'https://image.aladin.co.kr/product/31273/7/cover500/k542832564_1.jpg'
    },
    {
      id:5,
      imgurl:'https://image.aladin.co.kr/product/30876/42/cover500/k892831289_1.jpg'
    },
  ]
  const renderBestReview = books.map(book => {
    return (
      <div>
        <img src={book.imgurl} alt="책" />
      </div>
    )
  })
  return (
  <div className={styles['wrap-bestreview']}>
    <div className={styles['bestreview-title']}>
    베스트 리뷰
    </div>
    <div className={styles['wrap-bookimg'] }>
        {renderBestReview}
      </div>
  </div>
  )
}

export default BestReview