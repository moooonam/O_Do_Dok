import React from 'react'
import styles from '../../styles/Main.module.scss'
function MainCarousel() {
  return (
    <div className={styles['wrap-carousel']}>
        <div className={styles.flexbox}>
            <div className={styles.img1}></div>
            <div className={styles.img2}></div>
            <div className={styles.img2}></div>
        </div>
    </div>
  )
}

export default MainCarousel