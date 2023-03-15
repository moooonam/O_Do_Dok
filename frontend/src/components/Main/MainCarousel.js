import React from "react";
import styles from "../../styles/Main.module.scss";
// import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'

function MainCarousel() {
  return (
    <div className={styles['wrap-carousel']}>
    
      <div className={styles.img1}></div>
      
      {/* <Carousel showThumbs={false} showStatus={false}>
        <div>
          <img src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg" />
        </div>
        <div>
          <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />
        </div>
      </Carousel> */}
    </div>
  );
}

export default MainCarousel;
