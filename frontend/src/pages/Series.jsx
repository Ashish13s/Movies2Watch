import React from 'react'
import Main from '../components/Seriesmain';
import Header from '../components/Header';

const TV = () => {
  return (
    <div className="bg-black font-mono text-white min-h-screen overflow-y-hidden no-scrollbar ">
      <Header />
    <div className='bg-black overflow-y-hidden  '><Main /></div>
    </div>
  )
}

export default TV