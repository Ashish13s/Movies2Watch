import React, {useState, useEffect} from 'react'
import {BsFillCaretLeftFill,BsFillCaretRightFill} from 'react-icons/bs';
import axios from 'axios';

let movieids=["6430654d3ace314ef01a1801","6430654d3ace314ef01a3455","6430654d3ace314ef01a69d3","6430654d3ace314ef01a3645","6430654d3ace314ef01a0ed6","6430654d3ace314ef01a6215"] 
let images=["https://static.bunnycdn.ru/i/cache/images/c/ce/ce56e78d40871d2abf8c014013f3d4de.jpg",  "https://static.bunnycdn.ru/i/cache/images/3/32/326b491508acc08f6a06c4b39985af4a.jpg",
"https://static.bunnycdn.ru/i/cache/images/c/c5/c5069e20abc3445a2a90ca0d1f1249d0.jpg",
"https://static.bunnycdn.ru/i/cache/images/8/86/86a0c794d7bb48e8706a69c45d2cc389.jpg",
"https://static.bunnycdn.ru/i/cache/images/6/67/6772c079bb8d2b8dc6e28ddc51f5332b.jpg",
"https://static.bunnycdn.ru/i/cache/images/1/17/17e1f0345810576a37d3b012c6c117b5.jpg"]
//spiderman,endgame,dark knight,infinity,avatar,harrypotter

function Carousel() {
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [featuredImages, setFeaturedImages] = useState([]);
  useEffect(() => {axios.get(`http://127.0.0.1:8000/movie/${movieids[currentIndex]}`).then(response => {
      setMovies(response.data);
      // StartSlider();
      setLoading();
  });
},[]);
const [isShown, setIsShown] = useState(false);
  const handleMouseOver = () => {
    setIsShown(true);
  };
  const handleMouseOut = () => {
    setIsShown(false);
  };
    
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnNextClick = () =>{
    // console.log(featuredImages.length)
    let len = movieids.length
    if (len === 0) {len = 1}
    setCount((count + 1) % len)
    // console.log(count)
    setCurrentIndex(count);
  };
  
  const handleOnPrevClick = () =>{
    const productsLength = movieids.length;
    setCount((currentIndex + productsLength -1) % productsLength)
    // console.log(count)
    setCurrentIndex(count);
  };

  const StartSlider = () =>{
    setInterval(() => {handleOnNextClick();},40000)
  };
  if (isLoading) {
    return <div className="grid place-items-center py-[20%]">Loading...</div>;}
 return (
    <div className='overflow-y-hidden no-scrollbar pt-[80px] pb-[20px] sm:p-6  max-w-screen m-auto '>
      <div className='relative select-none '><button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}><a href={movies.movie_url}>
        <img className='object-cover sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[650px] 2xl:h-[700px] w-screen' src = {images[currentIndex]} alt="pic" ></img></a></button>
        {/* {isShown && (<div className='bg-[#ffffffad]  absolute w-[40%] h-full text-black right-0 top-0 transform-translate-y-1/2 flex flex-col p-7 gap-2'>
          <div className='sm:text-4xl text-xs/[13px] text-black'>{movies.movie_name}</div>
          <div className='hidden sm:flex'>{movies.movie_description}</div>
          <div className='hidden sm:flex'>{movies.movie_genre[0]}</div>
          <div className='hidden sm:flex'>{(movies.movie_release_date).slice(0,4)}</div>
          <div className='hidden sm:flex'>{(movies.movie_country)}</div>
          </div>)} */}
        <div className='absolute w-full top-1/2 transform-translate-y-1/2 flex justify-between items-start px-3'>
          <button className='p-1 rounded-full text-white bg-red-900' onClick={handleOnPrevClick}><BsFillCaretLeftFill /></button>
          <button className='p-1 rounded-full text-white bg-red-900' onClick={handleOnNextClick}><BsFillCaretRightFill /></button> 
          </div>
      </div>
    </div>
  )
}

export default Carousel

