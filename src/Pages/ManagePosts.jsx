import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts, deletePost } from "../redux/slices/postSlice";
import Swal from "sweetalert2";

export default function ManagePosts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Unauthorized",
        text: "You need to login first!",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    dispatch(fetchUserPosts(token));
  }, [dispatch, navigate]);

  const handleEdit = async (id) => {
    navigate(`/edit-post/${id}`);
  };

  const handleAdd = () => {
    navigate("/add");
  };
  const handleBack = () => {
    navigate("/posts");
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    Swal.fire({
      title: "Are you sure want to delete it?",
      text: "You can't undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E32636",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Nope!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deletePost({ id, token }))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Post has been deleted successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete post.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-4 relative gap-3">
        <h1 className="font-semibold text-xl mb-2">All of Your Posts</h1>
        <button
          onClick={handleBack}
          className="mb-3 font-montserrat text-white p-2 font-semibold rounded-full w-[8rem] border duration-100 bg-[#28282B] hover:bg-blue-600 hover:shadow-md"
        >
          Back!
        </button>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="mt-5 w-[80%]" key={post._id}>
              <div className="w-[80%] mt-[-45px]">
                <div className="flex flex-col w-[100%] my-3 mx-32 font-montserrat bg-white px-5 shadow-md rounded-lg">
                  <div className="py-7">
                    <h1 className="text-3xl font-bold mb-1">{post.title}</h1>
                    <p className="text-sm mb-3">
                      by {post.author} at {post.updatedAt.split("T")[0]}
                    </p>
                    <hr />
                    <p className="mt-3">
                      Location: {post.location} | Water Level: {post.height} |
                      Time: {post.time}
                    </p>
                    <p>{post.content}</p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => handleEdit(post._id)}
                        className="border rounded-md shadow-md px-2 py-1 w-[10%] duration-100 hover:bg-blue-600 hover:text-white text-blue-600 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="border rounded-md shadow-md px-2 py-1 w-[10%] duration-100 hover:bg-red-600 hover:text-white text-red-600 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center w-[80%]">
            <p className="p-4">No posts available.</p>
            <button
              onClick={handleAdd}
              className="border rounded-md shadow-md px-2 py-2 w-[200px] duration-100 hover:bg-blue-600 hover:text-white text-blue-600 font-semibold"
              type="button"
            >
              Make your first post!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
