import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, updatePost } from "../redux/slices/postSlice";

export default function EditPost() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post, status } = useSelector((state) => state.posts);

  const [form, setForm] = useState({
    title: "",
    content: "",
    height: "",
    location: "",
    time: "",
  });

  useEffect(() => {
    console.log("Post from Redux:", post);
  }, [post]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (id && token) {
      dispatch(fetchPostById({ id, token }))
        .unwrap()
        .catch((error) => {
          console.log("Error fetching post:", error);
          Swal.fire({
            title: "Error",
            text: error || "Failed to fetch post",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || "",
        content: post.content || "",
        height: post.height || "",
        location: post.location || "",
        time: post.time || "",
      });
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    dispatch(updatePost({ id, form, token }))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Success",
          text: "Post updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => navigate("/manage"));
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error || "Failed to update post!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBack = () => {
    navigate("/manage");
  };

  return (
    <div className="flex flex-col items-center justify-center font-montserrat">
      <Navbar />
      <div className="w-[80%]">
        <h1 className="mt-5 text-xl font-semibold">Edit Your Post</h1>
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
          <div className="flex mt-3">
            <div className="flex gap-3">
              <button
                type="submit"
                className="text-white p-2 font-semibold rounded-full w-[8rem] border duration-100 bg-[#28282B] hover:bg-blue-600 hover:shadow-md"
              >
                {status === "loading" ? "Updating" : "Submit"}
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
    </div>
  );
}
