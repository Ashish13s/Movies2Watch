import React, {useState,useEffect} from 'react';
import axios from "axios";
import Movie from "./Movie";
import { BiSearch } from "react-icons/bi";
import { Link } from 'react-router-dom';
// import Search from "./Search";
// import { FaRegUser } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
// import { BiHomeHeart } from "react-icons/bi";
// import { Link } from "react-router-dom";

function Showsearch() {
  
  const [toggle, setToggle] = useState(true);
  const [query, setQuery]= useState("Iron Man");
  const [movies,setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getData = () => {
    axios({
      method: "post",
      baseURL: "http://127.0.0.1:8000",
      url: "/searchMovie/",
      data: {
        "search_str" : `${query}`
      }
    })
      .then(function (response) {
        setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }; 
  
    useEffect(() => {
        getData();
        setLoading();
    },[query]);
    if (isLoading) {
      return <div className="grid place-items-center py-[20%]">Loading...</div>;}
  return (
    toggle ? (<div className="z-2 h-[200px]  sm:h-[60px] 
    flex flex-row justify-center w-full items-center"><div className=" bg-[#ad0e0e] rounded-sm"> 
      <div className="flex flex-row justify-center items-center">
      <div ><button onClick={() => setToggle(!toggle)}className=" bg-[#ad0e0e] rounded-full p-2 text-xl"><BiSearch /></button></div>
        <div className=" static">
         <button onSubmitCapture={() => setToggle(!toggle)}><form action="" onSubmit={(e)=>e.preventDefault()}>
           <input
            className="bg-[#ad0e0e]  w-[160px] rounded-xl relative m focus:outline-none  placeholder:text-white filter-none"
            type="search"
            placeholder="Search here"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
          />
          </form>
          </button>
        </div>
        
        <div ><Link to='/'> <button onClick={() => setToggle(toggle)}className=" bg-[#ad0e0e] rounded-full p-2 text-xl"><AiOutlineClose /></button></Link></div>
      </div>
  </div></div>)
  :
  <div className='place-items-center '>
  <h1 className='px-4 mt-[84px]  sm:mt-[20px] text-center text-white'>Search Results for {query} </h1>
  <div className='m-8  text-center no-scrollbar  '>
{movies.map((link, idx) => {
    return <button onClick={()=> setToggle(!toggle)} className='no-scrollbar object-cover ' key={idx}><Movie id={link._id} name={link.movie_name} image={link.movie_poster} /></button>
  })} </div>
  </div>
  
  )
  

}

export default Showsearch
