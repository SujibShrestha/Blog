import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../features/authSlice";

const Logoutbtn = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => dispatch(logout()))
      .catch(() => console.log("error in logoutBTn while logging out"));
  };

  return <button onClick={logoutHandler} className="inline-block px-6 py-2 duration-200
  hover:bg-blue-500 rounded-full">
    Logout
  </button>;
};

export default Logoutbtn;
