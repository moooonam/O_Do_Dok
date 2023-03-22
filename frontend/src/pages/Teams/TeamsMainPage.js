import React from 'react'
import styles from '../../styles/Teams.module.scss'
import TeamCard from '../../components/Teams/TeamCard'

function TeamsMainPage() {
  return (
    <div className={styles['wrap-all']}>
      <div className={styles.title}>모임 신청</div>
      <div className={styles['wrap-bar']}>
        <div>필터</div>
        <div className={styles['maketeam-btn']}>모임생성</div>
      </div>
      <TeamCard/>
    </div>
  )
}

export default TeamsMainPage