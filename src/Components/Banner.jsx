import React from "react";
import bannerImg from "../assets/banner.jpg";

export default function Banner() {
  return (
    <div className="flex flex-col">
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="md:h-[90vh] h-[100vh] flex"></div>
      </div>
      <div className="absolute flex flex-col md:top-54 md:left-12 top-[40%] left-[3rem] md:w-[30rem] md:h-[10rem]">
        <p className="font-montserrat md:text-4xl text-2xl px-2 py-1 bg-black/50 text-white">Share your experience</p>
        <p className="font-montserrat md:text-4xl text-2xl px-2 py-1 bg-black/50 text-white">and help others</p>
        <p className="font-montserrat text-white px-2 py-1 bg-black/50">By posting the flood information in your area, you can inform others about it!</p>
      </div>
    </div>
  );
}
