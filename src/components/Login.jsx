import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { validate } from "../utils/validate";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../utils/firebase";

const Login = () => {
  const [errMsg, setErrMsg] = useState(null);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [polling, setPolling] = useState(false);
  const [success, setSuccess] = useState(null);
  const email = useRef();
  const pwd = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    let pollingInterval;

    if (polling) {
      pollingInterval = setInterval(async () => {
        try {
          let user = auth.currentUser;
          if (user) {
            await user.reload();
            console.log("Polling: User reloaded, checking email verification");
            if (user?.emailVerified) {
              clearInterval(pollingInterval);
              setPolling(false);
              setSuccess("Email Verified, redirecting to Dashboard...");
              const { uid, email, displayName, photoURL } = user;
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
              setTimeout(() => {
                navigate("/dashboard");
              }, 3000);
            }
          } else {
            console.log("Polling: No User");
          }
        } catch (error) {
          console.error("Polling error:", error);
          setErrMsg("An error occurred during polling. Please try again.");
          clearInterval(pollingInterval);
          setPolling(false);
        }
      }, 5000);
    }

    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [polling, navigate, dispatch]);

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Dispatch user details to your Redux store
      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
      navigate("/dashboard");

      // Optionally redirect or show a success message
      console.log("User signed up successfully:", user);
    } catch (error) {
      console.error("Error signing up with Google:", error);
    }
  };

  const handleLogIn = () => {
    const msg = validate(null, email?.current.value, pwd?.current.value);
    setErrMsg(msg);

    if (msg) return;

    signInWithEmailAndPassword(auth, email.current.value, pwd.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (!user.emailVerified) {
          sendEmailVerification(user)
            .then(() => {
              setSuccess("Verification link sent to your Email. (To Login)");
              setPolling(true);
            })
            .catch((error) => {
              setErrMsg(
                "Failed to send verification email. Please try again later."
              );
            });
          setShowVerifyButton(true);
        } else {
          // Handle successful login if user is already verified
          // Navigate to dashboard or other actions
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setErrMsg("Invalid Credentials");
      });

    if (email.current) email.current.value = "";
    if (pwd.current) pwd.current.value = "";
  };

  const handleResendVerification = () => {
    const user = auth.currentUser;
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          setSuccess("Verification email resent. Check your inbox!");
        })
        .catch((error) => {
          setErrMsg("Failed to resend verification email.");
        });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://img.freepik.com/free-photo/stone-texture-background_632498-971.jpg"
          alt="background"
        />
      </div>

      <form
        className="relative my-8 mt-14 px-16 py-6 rounded-lg shadow-lg shadow-gray-300 z-10 w-[40%] bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          // Call handleLogIn on form submission
        }}
      >
        <div>
          <span className="text-3xl">Log in</span>
        </div>
        <div className="flex flex-col mt-4 w-full">
          <label className="text-lg" htmlFor="email">
            Email Address
          </label>
          <input
            ref={email}
            className="border border-gray-300 h-10 mt-1 px-2 rounded-md"
            id="email"
            type="text"
            onChange={() => setErrMsg(null)}
          />
        </div>
        <div className="flex flex-col mt-2 w-full">
          <label className="text-lg" htmlFor="pwd">
            Password
          </label>
          <div className="relative">
            <input
              ref={pwd}
              className="border border-gray-300 h-10 mt-1 px-2 rounded-md w-full"
              id="pwd"
              type={isPasswordVisible ? "text" : "password"}
              onChange={() => setErrMsg(null)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {isPasswordVisible ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <p className="text-red-500 font-bold text-md p-2">{errMsg}</p>
        <p className="text-green-500 font-bold text-md p-2">{success}</p>

        {showVerifyButton && (
          <div className="mt-4">
            <button
              onClick={handleResendVerification}
              className="bg-blue-500 w-full py-2 text-white text-lg rounded-md shadow-md"
            >
              Resend Verification Email
            </button>
          </div>
        )}

        <div className="my-6">
          <button
            className="bg-teal-400 w-full py-2 text-white text-lg rounded-md shadow-md shadow-gray-300"
            type="submit" // Change to type "submit"
            onClick={handleLogIn}
          >
            Log in
          </button>
        </div>
        <div className="text-gray-400 flex justify-center">
          ------ or ------
        </div>
        <div className="my-6">
          <button
            className=" w-full py-2 text-lg rounded-md shadow-md shadow-gray-300"
            onClick={handleGoogleSignUp}
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Sign up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
