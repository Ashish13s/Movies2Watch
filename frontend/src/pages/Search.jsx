import React, {useState} from 'react';
import Header from '../components/Header';
import Showsearch from '../components/Showsearch';


const Search = () => {
  return (
    <div className="bg-black font-mono text-white min-h-screen overflow-y-hidden no-scrollbar ">
        <Header />
        <Showsearch />
    
            </div>
  )
}

export default Search