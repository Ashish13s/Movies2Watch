import React, {useState,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from "axios";
import Header from '../components/Header';

const Seriesdetail =() => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [series, setseries] = useState([]);
  useEffect( () => { axios.get(`http://127.0.0.1:8000/series/${id}`).then(response => {
      setseries(response.data);
      setLoading(false);
  });
},[]);
  if (isLoading) {
    return <div className="bg-black text-white h-screen "><Header/>
    <div className='grid place-items-center py-[20%]'>Loading...</div></div>;
  }
  return (
    <div className="bg-black font-mono text-white min-h-screen overflow-y-hidden no-scrollbar ">
      <Header />
    <div className="grid place-items-center overflow-hidden m-auto">
    <div className="md:max-w-[1200px] my-6 py-20 px-2 sm:py-8 sm:px-16  ">
      <div className="flex flex-col gap-3 text-xl font-serif text-bold pb-4">
      <h1 className="text-[24px] sm:text-[44px]">
        {series.series_name}
      </h1>
      <ul className="flex flex-row justify-start gap-2 text-[18px] ">
      <li>{(series.series_release_date).slice(0,4)}</li>
      <p className="">.</p>
      <li>R</li>
      <p className="">.</p>
      <li>2h 22m</li>
      <p className="hidden sm:flex">.</p>
      <li className="hidden sm:flex">{(series.series_genre[0])}</li>
      <p className="hidden sm:flex">.</p>
      <li className="hidden sm:flex">{(series.series_country)}</li>
      </ul>
      </div>
      <div className="flex flex-col  justify-between ">
        <div className="flex flex-row text-center">
          <div className="hidden sm:flex justify-between">
            <img
              className="sm:max-w-[280px]"
              src={series.series_poster}
              alt="pic"
            />
          </div>
          <div className="sm:hidden flex justify-between">
            <img
              className="w-screen max-h-[320px] object-cover"
              src={series.series_poster}
              alt="pic"
            />
          </div>
          <div className="bg-[#920000] rounded-r-lg py-2  hidden sm:flex flex-col justify-between text-xl ">
          <div className="gap-5 flex flex-col pl-8 my-2  text-start">
            <div>Description:{series.series_description}</div>
            <div className="hidden lg:flex">Casts:{(series.series_casts)[0]},{(series.series_casts)[1]},{(series.series_casts)[2]}</div>
            <div className="hidden lg:flex">Genres:{(series.series_genre)}</div>
            <div>Country:{series.series_country}</div>
          </div>
          <div className="bg-[#ad0e0ebc] md:mx-28 lg:mx-40  rounded-md p-2 "><button><a href={series.series_url}>Watch series</a></button></div>
          </div>
        </div>
        
        <div className="bg-[#920000]  py-2 rounded-b-lg  sm:hidden flex flex-col justify-between text-xl gap-8 ">
          <div className="gap-5 flex flex-col px-5 my-2  text-start">
            <div>Description:{series.series_description}</div>
            <div className="">Casts:{(series.series_casts)[0]},{(series.series_casts)[1]},{(series.series_casts)[2]}</div>
            <div className="">Genres:{(series.series_genre)}</div>
            <div>Country:{series.series_country}</div>
          </div>
          <div className="bg-[#ad0e0ebc] mx-16  rounded-md p-2 mb-8 text-center"><button><a href={series.series_url}>Watch series</a></button></div>
          </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Seriesdetail;