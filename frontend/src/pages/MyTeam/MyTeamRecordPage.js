import React, {useEffect, useState} from 'react'
import SideBar from '../../components/SideBar'
import sidestyles from '../../styles/Sidebar.module.scss'
import recordstyles from '../../styles/MyTeamRecord.module.scss'
import { Api } from '../../Api'
import { useNavigate } from "react-router-dom";

function MyTeamRecordPage() {
  const movePage = useNavigate();
  const [lastDodoks,setLastDodoks] = useState([])
  const myTeamId = localStorage.getItem('myTeamId')
  
  useEffect(() => {
    Api.get(`/dodok/lastdodoks/${myTeamId}`, {
      headers: {
        "refresh-token": `Bearer ${localStorage.getItem("refresh-token")}`,
        "access-token": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
    .then((res) => {
      if (res.data.lenght !== 0 ){
        setLastDodoks([...res.data])
        console.log('지난도독', res)
      }
    })
  }, [])

  const goRecordDetail = (dodok) => {
    console.log('여기')
    localStorage.setItem('dodokRecordId', dodok.dodok.dodokId)
    movePage(`/myteam/${myTeamId}/record/${dodok.dodok.dodokId}`);
  }
  const renderTeamRecomendBook =  lastDodoks.map((dodok) => {
    return (
      <div key={dodok.dodok.dodokId} onClick={() => {goRecordDetail(dodok)}}>
        { dodok.dodok.book.bookImg !== "tmp" ? <img src={dodok.dodok.book.bookImg} alt="책" /> : <img src="https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088777__340.png" alt="책" />}
        <div className={recordstyles.booktitle}>{dodok.dodok.book.bookTitle}</div>
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