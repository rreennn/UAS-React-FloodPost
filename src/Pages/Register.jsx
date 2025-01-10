import React, { useState } from "react";
import Footer from "../Components/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/authSlice";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(form))
      .unwrap()
      .then((result) => {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error || "Failed to register!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
    setForm({ username: "", email: "", password: "" });
  };

  return (
    <div className="font-montserrat flex min-w-full h-[100vh] items-center flex-col justify-center">
      <div className="flex flex-1 items-center justify-center flex-col">
        <div className="flex w-[350px] items-center py-8 bg-white h-[400px] flex-col rounded-lg shadow-md">
          <p className="mt-2 text-lg">REGISTER</p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col py-5 px-5 gap-2"
          >
            <div>
              <label htmlFor="">Username</label>
              <input
                placeholder="ex. Jane Doe"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                id=""
                className="border w-full px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input
                placeholder="ex. janedoe@example.com"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                id=""
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                placeholder="Make a safe password!"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                id=""
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="m-auto pt-3">
              <button
                type="submit"
                className="font-montserrat text-white px-4 py-2 font-semibold rounded-full w-[150px] border duration-100 bg-[#28282B] hover:bg-blue-600 hover:shadow-md"
              >
                {status === "loading" ? "Registering" : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex w-full">
        <Footer />
      </div>
    </div>
  );
}
