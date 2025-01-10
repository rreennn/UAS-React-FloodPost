import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../redux/slices/postSlice";
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
import { useNavigate } from "react-router-dom";

export default function AllPosts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts)

  const handleClick = () => {
    navigate("/add");
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status])

  return (
    <div className="font-montserrat">
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-4 relative">
        <h1 className="font-semibold text-xl">Welcome to FloodPost!</h1>
        <div className="group flex justify-end sticky top-[85%] w-[88%] z-10">
          <p className="font-semibold absolute text-white top-[20%] text-start w-[160px] p-2 bg-sky-500 rounded-md right-6 opacity-0 group-hover:opacity-100 shadow-md duration-100">
            Add a Post!
          </p>
          <button
            onClick={handleClick}
            className="text-white text-4xl p-auto font-semibold rounded-full w-[70px] h-[70px] duration-100 bg-[#28282B] group-hover:bg-blue-600 z-10 hover:shadow-md"
          >
            +
          </button>
        </div>
        {/* card post part */}
        <div className="w-[80%] mt-[-45px]">
          {posts.map((post, index) => (
            <Post
              key={index}
              author={post.author}
              title={post.title}
              location={post.location}
              height={post.height}
              time={post.time}
              content={post.content}
              timestamp={post.updatedAt?.split("T")[0] || "No Date Available"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
