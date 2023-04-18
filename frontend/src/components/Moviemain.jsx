import React, {useState,useEffect} from "react";
import axios from "axios";
import Genre from "./Moviegenre";

function Screen() {
  const [genre, setGenre] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getData = () => {
  axios({
    method: "get",
    baseURL: "http://127.0.0.1:8000",
    url: "/getAllGenre",
  })
    .then(function (response) {
      // handle success
      // console.log(response);

      setGenre(response.data);
      // console.log(genre)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}; 

  useEffect(() => {
      getData();
      setLoading();
  }, []);

  if (isLoading) {
    return <div className="grid py-[20%] px-[45%] text-white bg-black h-screen ">Loading...</div>;}
  return (
    <div className="overflow-y-hidden overflow-hidden  text-white h-full py-10  ">
      <div className="flex flex-col justify-start">
      {genre.map((link, idx) => {
              return (<Genre key={idx} pname={link} type={link.charAt(0).toUpperCase() + link.substr(1).toLowerCase()}/>)
            })}
      </div>
    </div>
  )
}

export default Screen;