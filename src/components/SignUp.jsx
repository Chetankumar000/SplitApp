import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { provider } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { updateProfile } from "firebase/auth";
import { USER_AVATAR } from "../utils/constants";

const SignUp = () => {
  const name = useRef();
  const email = useRef();
  const pwd = useRef();
  const [text, setText] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [polling, setPolling] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    name.current.focus();
  }, []);

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
              setSuccess("Email Verified, redirecting to Login...");
              setTimeout(() => {
                signOut(auth).then(() => {
                  navigate("/login");
                });
              }, 3000);
            }
          } else {
            console.log("Polling : No User");
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
  }, [polling, navigate]);

  // useEffect(() => {
  //   let pollInterval;

  //   if (polling) {
  //     pollInterval = setInterval(async () => {
  //       try {
  //         const user = auth.currentUser;
  //         if (user) {
  //           await user.reload(); // Reload user to get the latest state
  //           console.log("Polling: User reloaded, checking email verification");
  //           if (user.emailVerified) {
  //             clearInterval(pollInterval);
  //             setPolling(false);
  //             setErrMsg("Email verified successfully! Redirecting to login...");
  //             setTimeout(() => {
  //               signOut(auth).then(() => {
  //                 navigate("/login");
  //               });
  //             }, 3000); // Redirect after 3 seconds
  //           }
  //         } else {
  //           console.log("Polling: No current user");
  //         }
  //       } catch (error) {
  //         console.error("Polling error:", error);
  //         setErrMsg("An error occurred during polling. Please try again.");
  //         clearInterval(pollInterval);
  //         setPolling(false);
  //       }
  //     }, 5000); // Poll every 5 seconds
  //   }

  //   return () => {
  //     if (pollInterval) clearInterval(pollInterval);
  //   };
  // }, [polling, navigate]);

  const togglePasswordIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleGoogleSignUp = async () => {
    try {
      console.log("Initiating Google sign-up...");

      // Perform Google sign-in using a popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Dispatch user details to the Redux store
      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );

      // Navigate to the dashboard after successful sign-up
      navigate("/dashboard");

      // Optional: log success
      console.log("User signed up successfully:", user);
    } catch (error) {
      console.error("Error signing up with Google:", error);

      // Optionally handle specific error cases
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("The popup was closed before completing the sign-in.");
      } else if (error.code === "auth/cancelled-popup-request") {
        console.warn("Only one popup request is allowed at one time.");
      } else {
        // Handle other potential errors
        console.error("An unexpected error occurred:", error.message);
      }
    }
  };

  const handleSignUp = async () => {
    const msg = validate(
      name?.current?.value,
      email?.current?.value,
      pwd?.current?.value
    );

    setErrMsg(msg);

    if (msg) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        pwd.current.value
      );
      const user = userCredential.user;

      await sendEmailVerification(user).then(() => {
        setSuccess(
          "Verification email sent. Please check your email and verify your account."
        );
        setPolling(true); // Start polling to check if the email is verified

        updateProfile(user, {
          displayName: name?.current?.value,
          photoURL: USER_AVATAR,
        });
      });

      // Clear the input fields
      if (pwd.current) pwd.current.value = "";
      if (email.current) email.current.value = "";
    } catch (error) {
      console.error("Error during signup:", error);
      setErrMsg(error.message || "An error occurred");
    }
  };

  return (
    <div className="flex mt-[5%] ml-[24%] h-screen">
      <div className="text-center">
        <Link to={"/"}>
          <img
            src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
            alt="logo"
            className="m-8 w-52"
          />
        </Link>
      </div>
      <form className="mt-8 w-1/2" onSubmit={(e) => e.preventDefault()}>
        <p className="font-semibold text-lg text-gray-400">
          INTRODUCE YOURSELF
        </p>
        <div className="mt-4 flex flex-col">
          <label className="text-2xl" htmlFor="name">
            Hi there! My name is
          </label>
          <input
            ref={name}
            className="text-xl border mt-2 border-gray-300 w-2/3 px-2 h-12 rounded-md shadow-md focus:outline-none focus:shadow-md focus:shadow-blue-400 transition-shadow duration-200"
            type="text"
            onChange={() => {
              setErrMsg(null);
              setText(true);
            }}
          />
        </div>

        <div
          className={`transition-all duration-500 ease-in-out transform ${
            text
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          {text && (
            <>
              <div className="mt-4 flex flex-col">
                <label className="text-xl" htmlFor="email">
                  Here's my <span className="font-bold">email address:</span>
                </label>
                <input
                  ref={email}
                  className="border mt-2 border-gray-300 w-2/3 px-2 h-10 rounded-md shadow-md focus:outline-none focus:shadow-md focus:shadow-blue-400 transition-shadow duration-200"
                  type="text"
                  id="email"
                  onChange={() => {
                    setErrMsg(null);
                  }}
                />
              </div>
              <div className="mt-4 flex flex-col w-2/3">
                <label className="text-xl" htmlFor="pwd">
                  And here's my <span className="font-bold">password:</span>
                </label>
                <div className="relative">
                  <input
                    ref={pwd}
                    className="border mt-2 w-full border-gray-300 px-2 h-10 rounded-md shadow-md focus:outline-none focus:shadow-md focus:shadow-blue-400 transition-shadow duration-200"
                    type={isPasswordVisible ? "text" : "password"}
                    id="pwd"
                    onChange={() => {
                      setErrMsg(null);
                    }}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordIcon}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 m-1"
                  >
                    {isPasswordVisible ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <p className="text-red-500 font-bold text-md p-2">{errMsg}</p>
        <p className="text-green-500 font-bold text-md p-2">{success}</p>

        <div className="mt-6 flex items-center">
          <button
            className="bg-orange-500 px-5 py-3 text-white text-2xl rounded-md shadow-md shadow-slate-200"
            onClick={handleSignUp}
          >
            Sign me up!
          </button>
          <span className="mx-4">or</span>
          <button
            className="rounded-md border shadow-md py-1 shadow-gray-300 px-2 flex items-center"
            onClick={handleGoogleSignUp}
          >
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Sign up with Google
          </button>
        </div>
        <div className="mt-4 ml-1">
          <Link to={"/login"}>
            <p className="text-teal-400 text-sm hover:underline  hover:text-black cursor-pointer my-2">
              Already Sign up, Continue to Login...
            </p>
          </Link>
          <Link to={"/terms"}>
            <p className="text-blue-500 hover:text-black hover:underline text-sm cursor-pointer">
              By signing up, you accept the SplitApp Terms of Service.
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
