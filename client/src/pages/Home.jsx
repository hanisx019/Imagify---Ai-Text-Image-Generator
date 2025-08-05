import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Create from '../components/Create'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import Button from '../components/Button'

const Home = () => {
  return (
    <div>
      <Header/>
      <Steps/>
      <Create/>
      <Testimonials/>
      <Button/>
    </div>
  )
}

export default Home
