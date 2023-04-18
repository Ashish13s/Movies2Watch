import React, { useState } from "react";
import { Link } from "react-router-dom";


function Card(props) {
  const [isShown, setIsShown] = useState(false);
  const handleMouseOver = () => {
    setIsShown(true);
  };
  const handleMouseOut = () => {
    setIsShown(false);
  };
  return (
    <div className="overflow-y-hidden ">
      <div className="gap-2">
        <div className="relative text-center ">
          <Link to={`/seriesdetails/${props.id}`}>
            <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              <div>
                <img
                  className="hover:opacity-[0.9]  max-w-[100px]  sm:max-w-[180px]  "
                  src={props.image}
                  alt="pic"
                />
              </div>
            </button>
                {isShown && (
                  <div className="bg-[#ffffffc3] font-bold text-black text-xs/[13px] absolute w-full bottom-1  p-2 ">
                    {props.name}
                  </div>
                )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
