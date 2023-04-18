import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { BiHomeHeart } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";


function Header() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="overflow-y-hidden bg-black ">
    <div className="bg-[#920000] z-20 overflow-hidden rounded-b-xl py-3 fixed w-full sm:relative text-[#ffffff]">
      <div className="flex flex-row justify-between items-center mx-8 sm:mx-[40px] ">
        <div className="flex flex-row">
          {toggle ? (
            <div className="bg-[#ad0e0e] rounded-full">
              <button className="m-2 text-2xl static sm:hidden flex">
                <AiOutlineClose onClick={() => setToggle(!toggle)} />
              </button>
            </div>
          ) : (
            <div className="bg-[#ad0e0e] rounded-full">
              <button className="m-2 text-2xl static sm:hidden flex">
                <FiMenu onClick={() => setToggle(!toggle)} />
              </button>
            </div>
          )}

          <div className="flex flex-row justify-between gap-1 sm:gap-6 items-center">
            <div className="bg-[#ad0e0e] rounded-full">
              <Link to="/">
              <button className="m-2 text-2xl text-[#ffffff]  static hidden sm:flex">
                <BiHomeHeart />
              </button>
              </Link>
            </div>
            <div>
            <Link to="/movie">
              <button className="font-medium italic hidden sm:flex">
                Movies
              </button>
              </Link>
            </div>

            <div>
            <Link to="/tvshows">
              <button className="font-medium italic hidden sm:flex">
                TV Shows
              </button>
              </Link>
            </div>
          </div>
          {/* d */}

          <div
            className={`fixed duration-500 z-20 justify-between sm:hidden w-full h-screen block items-center bg-[#000000] top-[64px]  ${
              toggle ? "left-[0]" : "left-[-100%]"
            } `}
          >
            <div>
            <Link to="/">
              <button className="px-4 py-6 font-medium italic ">Home</button>
              </Link>
            </div>
            <hr className=" text-red-950" />
            <div>
            <Link to="/movie">
              <button className="px-4 py-6  font-medium italic ">Movies</button>
            </Link>
            </div>
            <hr className="text-red-950" />

            <div>
            <Link to="/tvshows">
              <button className="px-4 py-6  font-medium italic ">
                TV Shows
              </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-items end gap-2  items-center">
          <div className="flex gap-2" ><div ><Link to='/search'><button  className="bg-[#ad0e0e] rounded-full p-2 text-xl"><BiSearch  /></button></Link></div>
          </div>
          <div className="bg-[#ad0e0e] rounded-full">
            <button className="m-2">
              <FaRegUser className="  text-[#ffffff] text-xl " />
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Header;
