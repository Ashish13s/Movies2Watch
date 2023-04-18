import React, {useState, useEffect} from 'react';
import Series from "./Series";
import axios from 'axios';
import {BsFillCaretLeftFill,BsFillCaretRightFill} from 'react-icons/bs';


function Genre(props) {
  let pname = props.pname
 
  const [movies, setMovies] = useState([]);
  const getData = () => {
  axios({
    method: "post",
    baseURL: "http://127.0.0.1:8000",
    url: "/getAllGenreSeries/",
    data: {
      "genre" : pname,
      "limit" : 30
    }
  })
    .then(function (response) {
      // handle success
      // console.log(response);

      setMovies(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}; 

  useEffect(() => {
      getData();
  },[]);
  

const scrollLeft = () => {
    document.getElementById(pname).scrollLeft -= 400;
}
const scrollRight = () => {
    document.getElementById(pname).scrollLeft += 400;
}

  return (
    <div className='overflow-y-hidden '>
          {movies.length >= 30 && <div><div className='ml-10'>{props.type}</div>
          <div className="py-4 flex items-center">
            <div className='relative w-1/12'>
              <div className='w-full text-right'>
              <button onClick={scrollLeft} className='rounded-full border 
                 border-gray-700 p-1 bg-red-900 shadow-red-900 shadow-lg'>
                  <BsFillCaretLeftFill />
                </button>
              </div>
            </div>
            <div id={props.pname} className='carousel py-4 flex items-center justify-start overflow-x-auto scroll-smooth gap-3 no-scrollbar'>
            {movies.map((link, idx) => {
              return <div className='' key={idx}><Series id={link._id} name={link.series_name} image={link.series_poster} /></div>
            })} 
            </div>
            <div className='w-1/12'>
              <div className='w-full '>
              <button onClick={scrollRight} className='rounded-full border 
                 border-gray-700 p-1 bg-red-900 shadow-red-900 shadow-lg'>
                  <BsFillCaretRightFill />
                </button>
              </div>
            </div>
          </div></div>}
          
          
    </div>
  )
}

export default Genre