import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home'
import BuyCredits from './pages/BuyCredits'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'


const App = () => {
  const {showLogin} = useContext(AppContext)
  return (
    <div class="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-purple-50 to-orange-50 pt-[15px]">
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/result' element={<Result />}/>
        <Route path='/buy' element={<BuyCredits />}/> 
        <Route path='/login' element={<Login />}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
