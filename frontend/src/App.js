import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import TV from "./pages/Series";
import Movie from "./pages/Movie";
import Search1  from "./pages/Search";
import Moviedetail from "./pages/Moviedetail";
import Seriesdetail from "./pages/Seriesdetail";
import Header from "./pages/Header";



function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Header />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tvshows" element={<TV />} />
        <Route path="/search"  element={<Search1 />} />
        <Route path="/moviedetails/:id"  element={<Moviedetail />} />
        <Route path="/seriesdetails/:id"  element={<Seriesdetail />} />
     
    {/* <div className="bg-black font-mono text-white min-h-screen overflow-y-hidden no-scrollbar ">
      <Home />
      </div> */}
       </Routes>
  )
}

export default App;
 