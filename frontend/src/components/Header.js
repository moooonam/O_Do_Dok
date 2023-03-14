import React from 'react'
import styles from '../styles/Header.module.scss'
import { useNavigate } from 'react-router-dom'
function Header() {
    const movePage = useNavigate()
    function goMain() {
        movePage('/')
    }
    function goLogin() {
        movePage('/login')
    }
  return (
    <div className={styles['wrap-header']}>
        <div className={styles['header-logo-btn']} onClick={goMain}>Oh Do Dok!</div>
        <div className={styles['wrap-content']}>
            <div className={styles['header-btn']}>소개</div>
            <div className={styles['header-btn']}>모임신청</div>
            <div className={styles['header-btn']}>오도독 책장</div>
        </div>
        <div className={styles['header-login-btn']}onClick={goLogin}>로그인</div>
    </div>
  )
}

export default Header