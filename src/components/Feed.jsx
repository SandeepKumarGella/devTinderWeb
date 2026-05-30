import React from "react";
import { useSelector } from "react-redux";

const Feed = () => {
  const allUsers = useSelector((state) => state.users);
  console.log("allUsers", allUsers);
  return <div>Feed</div>;
};

export default Feed;
