import React, { useEffect } from 'react'
import MainCarousel from '../components/Main/MainCarousel'
import RecomendBook from '../components/Main/RecomendBook'
import BestReview from '../components/Main/BestReview'

function MainPage() {
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })}
  useEffect(() => {
    scrollToTop();
  })
  return (
    <div>
        <MainCarousel/>
        <RecomendBook/>
        <BestReview/>
    </div>
  )
}

export default MainPage