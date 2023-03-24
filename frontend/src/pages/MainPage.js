import React from 'react'
import MainCarousel from '../components/Main/MainCarousel'
import RecomendBook from '../components/Main/RecomendBook'
import BestReview from '../components/Main/BestReview'

function MainPage() {
  return (
    <div>
        <MainCarousel/>
        <RecomendBook/>
        <BestReview/>
    </div>
  )
}

export default MainPage