import React, { use, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const handleSave = async (e) => {
    e.preventDefault();
    // Dispatch an action to update the user profile
    try {
      let response = await axios.patch(
        `${BASE_URL}/editprofile`,
        {
          firstName,
          lastName,
          gender,
          age,
          skills,
          about,
          photoUrl,
        },
        { withCredentials: true },
      );
      if (response.status === 200) {
        // Dispatch an action to update the user profile in the Redux store
        setToast(true);
        dispatch(addUser(response?.data?.userDetails));
      }
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      console.log("Error updating profile:", err);
    }
  };

  return (
    <div className="flex justify-center gap-10">
      <div className="flex justify-center items-center pb-20">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-5">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="label">firstName</label>
          <input
            type="text"
            className="input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">lastName</label>
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            readOnly
            value={user.email}
          />

          <label className="label">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="label">Age</label>
          <input
            type="number"
            className="input"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Skills</label>
          <input
            type="text"
            className="input"
            placeholder="Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value.split(","))}
          />

          <label className="label">About</label>
          <textarea
            className="textarea"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <label className="label">PhotoUrl</label>
          <input
            type="text"
            className="input"
            placeholder="PhotoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <div className="flex justify-center">
            <button className="btn btn-primary mt-4" onClick={handleSave}>
              Save
            </button>
          </div>
        </fieldset>
      </div>
      <div className="my-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <figure>
            <img
              src={photoUrl || "https://placeimg.com/400/225/arch"}
              alt="profile-pic"
              className="w-full h-80 object-fit"
            />
          </figure>
          <div className="card-body">
            <h2 className="text-2xl font-bold">
              {firstName} {lastName}
            </h2>
            <h4 className="text-lg">
              {age}, {gender}
            </h4>
            <h3 className="text-xl">{about}</h3>
            {skills?.length > 0 ? (
              <ul className="flex flex-wrap justify-center gap-2 mt-4">
                {skills.map((skill, index) => (
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
      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>User updated Successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
