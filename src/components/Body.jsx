import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchUser = async () => {
    try {
      let response = await axios.get(`${BASE_URL}/profile`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(addUser(response?.data?.userDetails));
      }
    } catch (err) {
      // Handle unauthorized access
      if (err.status === 401) {
        navigate("/login");
      }
      console.log("Error fetching user:", err);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
