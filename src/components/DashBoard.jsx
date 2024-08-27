import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import SecondaryHeader from "./secondaryHeader"; // Corrected import

const DashBoard = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
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
    <div>
      <SecondaryHeader /> {/* Corrected component name */}
      <div className="px-20 container h-full grid grid-cols-12 bg-gray-100">
        {/* Sidebar */}
        <aside className="col-span-3 h-full bg-yellow-400 px-2 pt-4">
          <nav>
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <section>
              <h3 className="font-medium">Recent Activity</h3>
              {/* Add recent activity content here */}
            </section>
          </nav>

          <section className="mt-8">
            <h3 className="font-medium">All Expenses</h3>
            <div className="flex justify-between mt-4">
              <span>Groups</span>
              <button className="text-blue-500">+ add</button>
            </div>
            <p className="text-gray-400 text-center text-xs mx-2">
              You do not have any groups yet.
            </p>

            <div className="flex justify-between mt-4">
              <span>Friends</span>
              <button className="text-blue-500">+ add</button>
            </div>
            <p className="text-gray-400 text-center text-xs mx-2">
              You have not added any friends yet.
            </p>
          </section>

          <section className="mt-8 p-1">
            <label htmlFor="invite" className="block font-medium mb-2">
              Invite Friends
            </label>
            <input
              id="invite"
              className="rounded-md border p-1 w-full mb-2"
              type="text"
            />
            <button className="border border-black p-1 rounded-md w-full">
              Send Invite
            </button>
          </section>
        </aside>

        {/* Main Content Area */}
        <main className="col-span-9  bg-blue-400">
          <div className="flex justify-between bg-gray-300 p-4">
            <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
            <div>
              <button className="mx-2 bg-orange-500 p-2 rounded-md">
                Add an expense
              </button>
              <button className="bg-teal-400 p-2 rounded-md">Settle up</button>
            </div>
          </div>

          <div className="flex h-screen">
            <div className="">
              <img
                className="mx-auto mt-8 w-1/2"
                src="https://assets.splitwise.com/assets/fat_rabbit/person-2d59b69b3e7431884ebec1a55de75a4153a17c4050e6b50051ca90412e72cf96.png"
                alt="Illustration"
              />
            </div>
            <div className="mt-16">
              <h2 className="text-4xl">Welcome to SplitApp</h2>
              <p className="text-lg mt-2 text-gray-300">
                Splitwise helps you split bills with friends.
              </p>
              <p className="text-lg mt-2 text-gray-300 w-[80%]">
                Click “Add an expense” above to get started, or invite some
                friends first!
              </p>
              <button className="bg-orange-500 p-2 w-2/3 rounded-md text-xl text-white mt-6">
                ➕ Add friends on SplitApp
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
