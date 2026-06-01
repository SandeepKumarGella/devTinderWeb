import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { addConnection } from "../utils/connectionSlice";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      let response = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(response.data?.pendingRequests));
    } catch (err) {
      console.log("fetching requests", err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const sendResponse = async (status, id) => {
    try {
      let response = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(addConnection(response?.data?.connectionRequests));
      dispatch(removeRequest(response.data?.connectionRequests));
    } catch (err) {
      console.log("fetching requests", err.message);
    }
  };

  return (
    <div>
      <p className="text-center p-4 pb-2 text-2xl opacity-60 tracking-wide">
        Received Connection Requests
      </p>
      {requests && requests.length > 0 ? (
        <div className="flex flex-row justify-center gap-10 pb-20">
          <div>
            {requests?.map((request) => (
              <div
                key={request._id}
                className="flex flex-col items-center gap-6 p-7 md:flex-row rounded-2xl bg-base-300 shadow-sm m-4"
              >
                <div className="col-3">
                  <img
                    className="size-20 shadow-xl rounded-md"
                    alt="profile-pic"
                    src={
                      request.fromUserId?.photoUrl ||
                      "https://placeimg.com/400/225/arch"
                    }
                  />
                </div>
                <div className="items-center col-3 my-4">
                  <div className="text-lg font-medium">
                    {request.fromUserId?.firstName}
                    {request.fromUserId?.lastName}
                  </div>
                  <div className="text-md font-medium">
                    {request.fromUserId?.age}, {request.fromUserId?.gender}
                  </div>
                </div>
                <div className="text-center col-3 mx-2 items-center">
                  <button
                    className="btn btn-primary mt-4 mx-2"
                    onClick={() =>
                      sendResponse("accepted", request.fromUserId._id)
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary mt-4"
                    onClick={() =>
                      sendResponse("rejected", request.fromUserId._id)
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-white-500 text-2xl mt-10 mx-4">
          No connections Request found!
        </p>
      )}
    </div>
  );
};

export default Requests;
