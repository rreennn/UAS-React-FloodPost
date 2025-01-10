import React from "react";

export default function Post({title, author, location, height, content, time, timestamp}) {
  return (
    <div className="flex flex-col w-[80%] my-3 mx-32 font-montserrat bg-white px-5 shadow-md rounded-lg">
      <div className="py-7">
        <h1 className="text-3xl font-bold mb-1">{title}</h1>
        <p className="text-sm mb-3">by {author} at {timestamp}</p>
        <hr />
        <p className="mt-3">Location: {location} | Water Level: {height} | Time: {time}</p>
        <p>{content}</p>
      </div>
    </div>
  );
}
