import React from 'react'
import Slider from '../../components/Slider/Slider'
import Products from '../../components/Products/Products'
import BigImage from '../../components/Products/BigImage'
import InfoBox from '../../components/Products/InfoBox'
import { slides } from '../../components/Slider/MenuSlider'

const Home = () => {
  return (
    <div>
      <main className="main-body">
        <Slider slides={slides} />
        <Products />
        <BigImage />
        <InfoBox />
      </main>
    </div>
  )
}

export default Home
