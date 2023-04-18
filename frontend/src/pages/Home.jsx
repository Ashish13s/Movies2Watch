import React from 'react'
import Header from '../components/Header';
import Carousel from "../components/Carousel";
import Main from '../components/Moviemain';

const Home = () => {
    return (
      <div className="bg-black font-mono text-white min-h-screen overflow-y-hidden no-scrollbar ">
        <Header />
      <div className='overflow-y-hidden  scroll-smooth no-scrollbar'>
        <Carousel />
      <Main /></div>
      </div>
    )
  }

export default Home