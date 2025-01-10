import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function AddPosts() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    height: "",
    location: "",
    time: "",
  });

  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.posts);
  const navigate = useNavigate();

  const handleManage = () => {
    navigate("/manage");
  };

  const handleBack = () => {
    navigate("/posts");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "You haven't logged in!",
        text: error.response?.data?.message || "Something wrong",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    }

    //with Redux
    dispatch(createPost({ form, token }))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Post created successfully!",
          icon: "success",
          confirmButtonText: "OK!",
        }).then(() => {
          navigate("/posts");
        });
      })
      .catch((errMessage) => {
        Swal.fire({
          title: "Couldn't create post!",
          text: errMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center font-montserrat">
      <Navbar />
      <div className="w-[80%]">
        <h1 className="mt-5 text-xl font-semibold">Add a new post!</h1>
      </div>
      <div className="w-[80%] bg-white rounded-md mt-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-5 py-3 px-5 gap-2"
        >
          <div>
            <label htmlFor="">Post title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              id=""
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              id=""
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="">Time</label>
            <input
              type="text"
              name="time"
              value={form.time}
              onChange={handleChange}
              id=""
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="">Water Level</label>
            <input
              type="text"
              name="height"
              value={form.height}
              onChange={handleChange}
              id=""
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              id=""
              className="w-full px-4 py-2 border rounded-lg"
              required
            ></textarea>
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex gap-3">
              <button
                type="submit"
                className="text-white p-2 font-semibold rounded-full w-[8rem] border duration-100 bg-[#28282B] hover:bg-blue-600 hover:shadow-md"
              >
                {status === "loading" ? "Creating" : "Submit"}
              </button>
              <button
                onClick={handleBack}
                className="text-white p-2 font-semibold rounded-full w-[8rem] border duration-100 bg-[#28282B] hover:bg-blue-600 hover:shadow-md"
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="my-4">
        <button
          onClick={handleManage}
          className="text-white p-2 font-semibold rounded-full w-[15rem] border duration-100 bg-[#28282B] hover:bg-blue-600 hover:shadow-md"
        >
          Manage Your Post
        </button>
      </div>
    </div>
  );
}
