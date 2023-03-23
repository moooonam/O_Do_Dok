import React from 'react'
import SideBar from '../../components/SideBar'
import sidestyles from '../../styles/Sidebar.module.scss'
import recordstyles from '../../styles/MyTeamRecord.module.scss'

function MyTeamRecordPage() {
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
    {
      id: 4,
      imgurl:
        "https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg",
    },
    {
      id: 6,
      imgurl:
        "https://image.aladin.co.kr/product/30872/82/cover500/s412832889_1.jpg",
    },
    {
      id: 6,
      imgurl:
        "https://image.aladin.co.kr/product/30818/49/cover500/s072831276_1.jpg",
    },
    {
      id: 7,
      imgurl:
        "https://image.aladin.co.kr/product/30929/51/cover500/k732831392_2.jpg",
    },
    {
      id: 8,
      imgurl:
        "https://image.aladin.co.kr/product/30872/82/cover500/s412832889_1.jpg",
    },
    {
      id: 9,
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
  return (
    <div className={sidestyles['myteam-container']}> 
        <SideBar location={"record"}/>
        <div className={sidestyles.others}>
            <div className={recordstyles['records-container']}>
              <h2>오도독의 지난활동</h2>
                <div className={recordstyles['record-wrap-bookimg']}>
                  {renderTeamRecomendBook}
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyTeamRecordPage