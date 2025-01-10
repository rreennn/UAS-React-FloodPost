import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure want to Log Out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E32636",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Log Out!",
      cancelButtonText: "Nope!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
      }
    });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white w-full py-1 flex sticky border shadow-md justify-between top-0 z-10 px-8 ">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-[50px]" />
        </Link>
      </div>
      <div className="flex items-center ">
        <Link
          to="/"
          className="font-montserrat font-bold text-center text-xl pl-[120px]"
        >
          FloodPost
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <p>{username ? `Hello, ${username}` : "Hello, Guest!"}</p>
        {username ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </div>
  );
}
