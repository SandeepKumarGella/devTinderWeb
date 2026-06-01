import React from "react";
import { addRequest } from "../utils/requestSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ users }) => {
  const dispatch = useDispatch();

  const sendRequest = async (status, id) => {
    try {
      let response = await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(addRequest(response?.data?.connections?.fromUserId));
      dispatch(removeFeed(response.data?.connections?.toUserId));
    } catch (err) {
      console.log("fetching requests", err.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 mt-8 pb-20">
      {users?.length > 0 &&
        users?.map((user) => (
          <div
            key={user._id}
            className="card bg-base-300 w-96 max-w-xl shadow-sm"
          >
            <figure>
              <img
                src={user?.photoUrl || "https://placeimg.com/400/225/arch"}
                alt="profile-pic"
                className="w-full h-80 object-fit"
              />
            </figure>
            <div className="card-body">
              <h2 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h2>
              <h4 className="text-lg">
                {user?.age}, {user?.gender}
              </h4>
              <h3 className="text-xl">{user?.about}</h3>
              {user?.skills?.length > 0 ? (
                <ul className="flex flex-wrap justify-center gap-2 mt-4">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="badge badge-outline">
                      {skill}
                    </span>
                  ))}
                </ul>
              ) : (
                <p>No skills listed</p>
              )}
              <div className="flex justify-center">
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => sendRequest("interested", user._id)}
                >
                  Like
                </button>
                <button
                  className="btn btn-secondary mt-4 ml-4"
                  onClick={() => sendRequest("ignored", user._id)}
                >
                  Dislike
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserCard;
