import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, signOut } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          const { uid, email, displayName, photoURL } = user;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            })
          );
          navigate("/dashboard");
        } else {
          // alert("Please verify your email before accessing the dashboard.");
          // auth.signOut(); // Sign out the user if the email is not verified
          dispatch(removeUser());
          // navigate("/"); // Redirect to the home or login page
        }
      } else {
        // User is signed out
        dispatch(removeUser());
        // navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
