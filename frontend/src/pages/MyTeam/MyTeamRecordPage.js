import React from 'react'
import SideBar from '../../components/SideBar'
import styles from '../../styles/Sidebar.module.scss'
function MyTeamRecordPage() {
  return (
    <div className={styles['myteam-container']}> 
        <SideBar/>
        <div className={styles.others}>
            MyTeamRecordPage
        </div>
    </div>
  )
}

export default MyTeamRecordPage