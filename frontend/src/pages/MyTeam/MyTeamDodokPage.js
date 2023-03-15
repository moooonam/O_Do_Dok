import React from 'react'
import SideBar from '../../components/SideBar'
import styles from '../../styles/Sidebar.module.scss'
function MyTeamDodokPage() {
  return (
    <div className={styles['myteam-container']}> 
        <SideBar/>
        <div className={styles.others}>
            MyTeamDodokPage
        </div>
    </div>
  )
}

export default MyTeamDodokPage