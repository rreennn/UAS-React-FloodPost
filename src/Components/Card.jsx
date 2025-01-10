import React from "react";

export default function Card({title, content, author, location, height}) {
  return (
    <div className=" bg-[#F0F0F0] pb-8 border rounded-md w-[300px] shadow-lg h-[250px] font-montserrat">
      <div className="bg-[#28282B] px-4 py-2 rounded-t-md text-white">
        <p className="font-bold ">by {author}</p>
      </div>
      <div className="px-4 py-2">
        <p className="font-semibold text-center">{title}</p>
        <p>Location: {location}</p>
        <p>Water Level: {height}</p>
        <hr className="bg-black p-[0.4px] my-2"/>
        <p>{content}</p>
      </div>
    </div>
  );
}
