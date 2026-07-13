import React, { useState } from 'react'
import Header from '../components/Header'
import MenuCategory from '../components/MenuCategory'
import FoodDisplay from '../components/FoodDisplay'
import AppDownload from '../components/AppDownload'

const Home = () => {
  const [category, setCategory] = useState('All')
  return (
    <div>
      <Header />
      <MenuCategory category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  )
}

export default Home
