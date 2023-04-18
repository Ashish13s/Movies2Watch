import React from 'react'
import Main from '../components/Moviemain';
import Header from '../components/Header';

const Movie = () => {
  return (
    <div className="bg-black font-mono text-white h-screen overflow-y-hidden no-scrollbar ">
      <Header />
    <div className='bg-black overflow-y-hidden  '><Main /></div>
    </div>
  )
}

export default Movie