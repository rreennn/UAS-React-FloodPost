import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import Footer from "../Components/Footer";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleClick = () => {
    navigate("/posts");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://test-api-nine-gamma.vercel.app/api/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="md:flex flex-col w-[100%] h-[100vh]">
      <Navbar />
      <div>
        <Banner />
        <div className="flex flex-col items-center py-4">
          <div className="flex flex-col my-5 mx-32 font-montserrat bg-white px-5 py-5 shadow-md rounded-lg ">
            <p className="text-center text-xl font-semibold">About this Web</p>
            <hr className="w-full h-px mx-auto my-1 bg-gray-500/50 border-0 rounded" />
            <p className="pb-3 pt-2 text-justify px-5">
              Flood is one of disaster due too weather, human error, and many
              other things. So far, flood can bring negative impact to our life.
              FloodPost is a web where you can post about flood near you, or
              your past flood experience. With this, you can share it with other
              users and help them informed. Help your friend, family, and
              stranger to avoid flood also take care of our earth, so we can
              prevent disaster like flood! <br />
              <p className="text-center font-semibold">
                - Stay safe everyone ❤️ -
              </p>
            </p>
          </div>
          <p className="font-semibold text-lg font-montserrat">
            Some of their posts
          </p>
          <div className="flex gap-5 my-3">
            {posts.slice(0, 3).map((post, index) => (
              <Card
                key={index}
                author={post.author}
                title={post.title}
                location={post.location}
                height={post.height}
                content={post.content}
              />
            ))}
          </div>
          <p className="my-1 font-montserrat">Make your FloodPost now!</p>
          {username ? (
            <button
              onClick={handleClick}
              className="font-montserrat text-white p-2 font-semibold rounded-full w-[8rem] border duration-100 bg-[#28282B] hover:bg-blue-600 hover:shadow-md"
            >
              Let's Go!
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="font-montserrat text-white p-2 font-semibold rounded-full w-[8rem] border duration-100 bg-[#28282B] hover:bg-blue-600 hover:shadow-md"
            >
              Login
            </button>
          )}
        </div>
        <div className="mt-3">
          <Footer />
        </div>
      </div>
    </div>
  );
}
