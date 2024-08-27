import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const SecondaryHeader = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="flex py-1 px-20 justify-between relative w-full bg-zinc-100 z-20">
      <Link to={"/"}>
        <div className="flex py-1">
          <img
            className="w-8"
            src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
            alt="Splitwise Logo"
          />

          <p className="font-bold ml-2 my-auto text-xl">SplitEasy</p>
        </div>
      </Link>
      {user ? (
        <div
          className="my-auto flex items-center mx-8 rounded-full border border-black cursor-pointer"
          onClick={handleLogOut}
        >
          <img
            className="w-10 rounded-full"
            src={user?.photoURL}
            alt="photo-icon"
          />
          <span className="mx-2">{user?.displayName}</span>
        </div>
      ) : (
        <div className="my-auto">
          <Link to="/login">
            <span className="text-teal-400 text-md mx-2 font-semibold cursor-pointer">
              Log in
            </span>
          </Link>
          <Link to="/signup">
            <span className="bg-teal-400 text-white text-md px-4 py-1 mx-6 rounded-md shadow-md shadow-slate-400 font-semibold cursor-pointer">
              Sign Up
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SecondaryHeader;
