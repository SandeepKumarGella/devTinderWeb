import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(response?.data?.data));
    } catch (err) {
      console.log("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div>
      <p className="text-center p-4 pb-2 text-2xl opacity-60 tracking-wide">
        Connections
      </p>
      {connections && connections.length > 0 ? (
        <div className="flex flex-row justify-center gap-10 pb-30">
          <div>
            {connections?.map((connection) => (
              <div
                key={connection._id}
                className="flex flex-col items-center gap-6 p-7 md:flex-row rounded-2xl bg-base-300 shadow-sm m-4"
              >
                <div className="w-40 flex-none">
                  <img
                    className="size-50 shadow-xl rounded-md"
                    alt="profile-pic"
                    src={
                      connection.photoUrl || "https://placeimg.com/400/225/arch"
                    }
                  />
                </div>
                <div className="items-center col-6 my-4 w-50 flex-auto my-2">
                  <div className="text-xl font-medium">
                    {connection.firstName} {connection.lastName}
                  </div>
                  <div className="my-2">
                    <h4 className="text-sm">
                      {connection?.age} , {connection?.gender}
                    </h4>
                    <h3 className="text-xs my-2">{connection?.about}</h3>
                    {connection?.skills?.length > 0 ? (
                      <ul className="flex flex-wrap  gap-2 mt-4">
                        {connection.skills.map((skill, index) => (
                          <span key={index} className="badge badge-outline">
                            {skill}
                          </span>
                        ))}
                      </ul>
                    ) : (
                      <p>No skills listed</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-white-500 text-2xl mt-10 mx-4">
          No connections found!
        </p>
      )}
    </div>
  );
};

export default Connections;
