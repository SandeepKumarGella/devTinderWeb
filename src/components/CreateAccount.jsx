import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const CreateAccount = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("male");
  const [age, setAge] = React.useState("");
  const [skills, setSkills] = React.useState([]);
  const [about, setAbout] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [toast, setToast] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      let response = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          email,
          password,
          gender,
          age,
          skills,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(response?.data?.user));
      // Redirect or perform any other actions after successful account creation
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
      return navigate("/"); // Redirect to home after successful account creation
    } catch (error) {
      navigate("/login");
      console.error("Error creating account:", error);
    }
  };

  return (
    <div>
      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Account Created Successfully!</span>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center pb-20">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-5">
          <legend className="fieldset-legend">Create Account</legend>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setAge(e.target.value || "")}
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
            <button className="btn btn-primary mt-4" onClick={handleSignup}>
              Create Account
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default CreateAccount;
