import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const allUsers = useSelector((state) => state.feed);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.users));
    } catch (err) {
      console.log("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [user?._id]); // Refetch feed when user changes

  return (
    <div>
      {allUsers?.length > 0 ? (
        <UserCard users={allUsers} />
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default Feed;
