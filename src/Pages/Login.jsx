import React, { useState } from "react";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(form))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Login Success!",
          icon: "success",
          confirmButtonText: "OK!",
        }).then(() => {
          navigate("/posts");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error || "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="font-montserrat flex w-full h-[100vh] items-center justify-center flex-col">
      <div className="flex flex-1 items-center justify-center flex-col">
        <div className="flex w-[350px] items-center py-8 bg-white h-[400px] flex-col rounded-lg shadow-md">
          <p className="text-lg">LOGIN</p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-5 py-3 px-5 gap-2"
          >
            <div>
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={form.email}
                id=""
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={form.password}
                id=""
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className=" flex flex-col items-center justify-center pt-8">
              <button
                type="submit"
                className="font-montserrat text-white px-4 mb-6 py-2 font-semibold rounded-full w-[150px] border duration-100 bg-[#28282B] hover:bg-blue-600 hover:shadow-md"
              >
                {status === "loading" ? "Logging in..." : "Login"}
              </button>
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500">
                  Register!
                </Link>
              </p>
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
