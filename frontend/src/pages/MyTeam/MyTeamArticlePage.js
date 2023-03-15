import React from 'react'
import SideBar from '../../components/SideBar'
import styles from '../../styles/Sidebar.module.scss'
function MyTeamArticlePage() {
  return (
    <div className={styles['myteam-container']}> 
        <SideBar/>
        <div className={styles.others}>
            MyTeamArticlePage
        </div>
    </div>
  )
}

export default MyTeamArticlePage