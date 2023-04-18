import React, { useState } from "react";
import { Link} from "react-router-dom";


function Card(props) {
  const [isShown, setIsShown] = useState(false);
  const handleMouseOver = () => {
    setIsShown(true);
  };
  const handleMouseOut = () => {
    setIsShown(false);
  };
  return (
    <div>
      <div className="overflow-y-hidden  gap-2">
        <div className="relative text-center ">
          <Link to={`/moviedetails/${props.id}`}>
            <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              <div>
                <img
                  className="hover:opacity-[0.9] h-[262px] max-w-[160px]  sm:max-w-[180px]  "
                  src={props.image}
                  alt="pic"
                />
                {isShown && (
                  <div className="bg-[#ffffffc3] font-bold text-black text-xs absolute w-full bottom-1 p-2 ">
                    {props.name}
                  </div>
                )}
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
