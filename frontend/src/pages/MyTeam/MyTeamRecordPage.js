import React, {useEffect, useState} from 'react'
import SideBar from '../../components/SideBar'
import sidestyles from '../../styles/Sidebar.module.scss'
import recordstyles from '../../styles/MyTeamRecord.module.scss'
import { Api } from '../../Api'
function MyTeamRecordPage() {
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
  const renderTeamRecomendBook =  lastDodoks.map((dodok) => {
    return (
      <div key={dodok.dodok.dodokId}>
        <img src={dodok.dodok.book.bookImg} alt="책" />
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