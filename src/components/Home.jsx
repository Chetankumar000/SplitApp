import React, { useEffect, useState } from "react";
import RightIcon from "./RightIcon";
import Statement from "./Statement";
import HomeBtn from "./HomeBtn";
import { Link } from "react-router-dom";

const Home = () => {
  const [icon, setIcon] = useState("✈️");
  const [text, setText] = useState("on trips.");
  const [color, setColor] = useState("teal-400");
  const [currIndex, setCurrIndex] = useState(0);

  const icons = ["✈️", "🏠", "💗", "🌸"];
  const texts = [
    "on trips.",
    "with housemates.",
    "with your partner.",
    "with anyone.",
  ];

  const colors = ["gray-400", "yellow-500", "red-500", "pink-500"];

  useEffect(() => {
    const intervalid = setInterval(() => {
      handleIcon(currIndex);
      setCurrIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 3000);
    return () => clearInterval(intervalid);
  }, [currIndex]);

  const handleIcon = (index) => {
    setIcon(icons[index]);
    setColor(colors[index]);
    setText(texts[index]);
  };

  return (
    <div>
      <div className="w-full h-full">
        {/* Main content with background image */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://img.freepik.com/free-photo/stone-texture-background_632498-971.jpg"
            alt="logo"
          />
        </div>

        {/* Main Grid Layout */}
        <div className="relative z-10 grid grid-cols-12 gap-4 h-full my-0">
          <div className="col-span-6 my-16 mt-20 ml-32">
            {/* Content for the first column */}
            <p className="text-black font-bold text-5xl">
              Less stress when sharing expenses
            </p>
            <Statement text={text} color={color} />
            <div className="my-6">
              {icons.map((ic, index) => (
                <span
                  key={ic}
                  onClick={() => handleIcon(index)}
                  className="text-6xl cursor-pointer"
                >
                  {ic}
                </span>
              ))}
            </div>
            <p className="text-lg mt-8">
              Keep track of your shared expenses and balances with housemates,
              trips, groups, friends, and family.
            </p>

            <HomeBtn color={color} />

            <p className="mt-4">Free for 🍎 iPhone, 🤗 Android, and web.</p>
          </div>

          <RightIcon icon={icon} />
        </div>
      </div>
      <div className="grid grid-cols-12 relative">
        <div className="col-span-6 w-full h-screen relative">
          <img
            className="w-full h-full object-cover"
            src="https://t4.ftcdn.net/jpg/02/86/37/57/240_F_286375793_tMNCezCxZVJMzXVlunBoKI1JWP72cE9L.jpg"
            alt="Background"
          />
          <div className="absolute bottom-0 w-full flex flex-col items-center z-30 mt-4">
            <div className="text-center mb-8 w-2/3 ">
              <p className="text-white text-4xl font-bold">Track balances</p>
              <p className="text-white text-lg my-2">
                Keep track of shared expenses, balances, and who owes who.
              </p>
            </div>
            <img
              className="w-[50%]"
              src="https://assets.splitwise.com/assets/home_page/fixtures/asset1@2x-b7225a262a58f40d591ad168dded30b61f6c6e0daaba1b2e83f1e8f7263be050.png"
              alt="Overlay"
            />
          </div>
        </div>

        <div className="col-span-6 w-full h-screen relative">
          <img
            className="w-full h-full object-cover"
            src="https://t3.ftcdn.net/jpg/03/27/21/58/240_F_327215890_M6e4IrzsTC45msK2TIukU7qzYgKhmtcy.jpg"
            alt="Background"
          />
          <div className="absolute bottom-0 w-full flex flex-col items-center z-30 mt-4">
            <div className="text-center mb-8 w-2/3 ">
              <p className="text-white text-4xl font-bold">Organize expenses</p>
              <p className="text-white text-lg my-2">
                Split expenses with any group: trips, housemates, friends, and
                family.
              </p>
            </div>
            <img
              className="w-[50%]"
              src="https://assets.splitwise.com/assets/home_page/fixtures/asset2@2x-1a032de8cdb5bd11e5c3cd37ce08391497ac0f14f2bba61987be82e3421ba42c.png"
              alt="Overlay"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 relative">
        <div className="col-span-6 w-full h-screen relative">
          <img
            className="w-full h-full object-cover"
            src="https://t3.ftcdn.net/jpg/02/22/59/20/240_F_222592081_zmDaydFjAwv7u5dUfI2FVqhoEFoOp5lf.jpg"
            alt="Background"
          />
          <div className="absolute bottom-0 w-full flex flex-col items-center z-30 mt-4">
            <div className="text-center mb-8 w-2/3 ">
              <p className="text-white text-4xl font-bold">
                Add expenses easily
              </p>
              <p className="text-white text-lg my-2">
                Quickly add expenses on the go before you forget who paid.
              </p>
            </div>
            <img
              className="w-[50%]"
              src="https://assets.splitwise.com/assets/home_page/fixtures/asset3@2x-233776b3d1a29f11a498cb836488ad04a552788bb66c0f4e1fc0c5d2b0f4f69a.png"
              alt="Overlay"
            />
          </div>
        </div>

        <div className="col-span-6 w-full h-screen relative">
          <img
            className="w-full h-full object-cover"
            src="https://t4.ftcdn.net/jpg/02/86/37/57/240_F_286375793_tMNCezCxZVJMzXVlunBoKI1JWP72cE9L.jpg"
            alt="Background"
          />
          <div className="absolute bottom-0 w-full flex flex-col items-center z-30 mt-4">
            <div className="text-center mb-8 w-2/3 ">
              <p className="text-white text-4xl font-bold">Pay friends back</p>
              <p className="text-white text-lg my-2">
                Settle up with a friend and record any cash or online payment.
              </p>
            </div>
            <img
              className="w-[50%]"
              src="https://assets.splitwise.com/assets/home_page/fixtures/asset4@2x-b24f9dbf919621d81e506157b33c60745aa32509452eba4c8f2482ae17d2fd47.png"
              alt="Overlay"
            />
          </div>
        </div>
      </div>
      <div className="relative h-screen w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://t4.ftcdn.net/jpg/05/81/96/25/240_F_581962592_JRLUNnGjXMFJrpc25iDvLWAWFYprUpkm.jpg"
            alt="Background"
          />
        </div>

        {/* First Foreground Content */}
        <div className="absolute top-0 left-0 w-1/2 h-full z-40 flex items-center justify-center">
          <div className="text-white text-center ml-16">
            <p className="text-4xl my-4 font-bold ">Get even more with PRO</p>
            <p className="text-lg my-4">
              Get even more organized with receipt scanning, charts and graphs,
              currency conversion, and more!
            </p>
            <Link to={"/signup"}>
              <button className="bg-purple-800 border border-white shadow-md hover:shadow-gray-300 text-2xl font-bold px-6 py-2 rounded-lg">
                Sign up
              </button>
            </Link>
          </div>
        </div>

        {/* Second Foreground Image */}
        <div className="absolute bottom-0 right-0 w-1/2 h-full z-40 flex items-end justify-center">
          <div className="absolute w-[53%]  h-[76%]">
            <img
              className="absolute w-full h-full object-cover"
              src="https://assets.splitwise.com/assets/home_page/fixtures/asset5@2x-dc95398d4023e88e07a5242df269f7a5f7c738b40fae988281ddd480b0fc6e2d.png"
              alt="Image 2"
            />
          </div>
        </div>
      </div>
      <div className="relative h-screen w-full bg-white">
        {/* Background Image */}
        <div className="w-full flex justify-center pt-10">
          <h1 className="font-bold text-5xl">The whole nine yards</h1>
        </div>

        <div className="absolute top-20 w-full mt-4 text-xl">
          {/* First Foreground Content */}
          <div className="absolute left-0 w-1/3 z-40 flex items-start justify-start px-10 py-4 mt-4">
            <ul className="mt-4 px-4 space-y-5">
              <li>👉 Add groups and friends</li>
              <li>👉 Split expenses, record debts</li>
              <li>👉 Equal or unequal splits</li>
              <li>👉 Split by % or shares</li>
              <li>👉 Calculate total balances</li>
              <li>👉 Simplify debts</li>
              <li>👉 Recurring expenses</li>
              <li>👉 Offline mode</li>
            </ul>
          </div>

          {/* Second Foreground Image */}
          <div className="absolute left-1/3 w-1/3 z-40 flex items-start justify-start px-10 py-4 mt-4">
            <ul className="mt-4 px-4 space-y-5">
              <li>👉 Cloud sync</li>
              <li>👉 Spending totals</li>
              <li>👉 Categorize expenses</li>
              <li>👉 7+ languages</li>
              <li>👉 100+ currencies</li>
              <li>👉 Payment integrations</li>
              <li>💎 Unlimited expenses</li>
              <li>💎 Transaction import</li>
            </ul>
          </div>
          <div className="absolute left-2/3 w-1/3 z-40 flex items-start justify-start px-10 py-4 mt-4">
            <ul className="mt-4 px-4 space-y-5">
              <li>💎 Currency conversion</li>
              <li>💎 Receipt scanning</li>
              <li>💎 Itemization</li>
              <li>💎 Charts and graphs</li>
              <li>💎 Expense search</li>
              <li>💎 Save default splits</li>
              <li>💎 A totally ad-free experience</li>
              <li>💎 Early access to new features</li>
            </ul>
          </div>
        </div>

        {/* Last Bit Positioned at the Bottom */}
        <div className="absolute text-2xl bottom-2 w-full flex justify-center pb-16">
          <span className="mx-8">👉 Core features</span>
          <span className="mx-8">💎 Pro features</span>
        </div>
      </div>

      <div className="relative w-full bg-white ">
        {/* Background Image */}

        <div className=" top-0 w-full text-lg justify-center flex flex-wrap gap-4 ">
          {/* First Foreground Content */}
          <div className=" w-[30%] z-40 items-start justify-start px-10 py-4 border bg-slate-50 border-gray-300 shadow-md shadow-gray-300 rounded-md">
            <div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, inventore.
              </p>
              <div className="flex mt-8 items-center ">
                <img
                  className="w-12 mr-8 rounded-md"
                  src="https://assets.splitwise.com/assets/home_page/logos/ft-152c170779821a7cff1ab468de0412defae4b4bcd1430bdd7cfc4901c8d338fc.png"
                  alt=""
                />
                <span>Financial Times</span>
              </div>
            </div>
          </div>

          {/* Second Foreground Image */}
          <div className="  w-[30%] z-40 items-start justify-start px-10 py-4 border bg-slate-50 border-gray-300 shadow-md shadow-gray-300 rounded-md">
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed,
                placeat.
              </p>
              <div className="flex mt-8 items-center ">
                <span>Aakansha, BMI</span>
              </div>
            </div>
          </div>

          <div className="  w-[30%] z-40 items-start justify-start px-10 py-4 border bg-slate-50 border-gray-300 shadow-md shadow-gray-300 rounded-md">
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tempora, quibusdam?
              </p>
              <div className="flex mt-8 items-center ">
                <img
                  className="w-12 mr-8 rounded-md"
                  src="https://assets.splitwise.com/assets/home_page/logos/nyt-68d17fe3b579e967803b3bfa086047106eb7c67ba2d64149f606457e2df5437c.png"
                  alt=""
                />
                <span>NY Times</span>
              </div>
            </div>
          </div>
          <div className="  w-[30%] z-40 items-start justify-start px-10 py-4 border bg-slate-50 border-gray-300 shadow-md shadow-gray-300 rounded-md">
            <div>
              <p>
                "Fundamental" for tracking finances, As good as WhatsApp for
                containing awkwardness
              </p>
              <div className="flex mt-8 items-center ">
                <span>Suraj, BMI</span>
              </div>
            </div>
          </div>
          <div className="  w-[30%] z-40 items-start justify-start px-10 py-4 border bg-slate-50 border-gray-300 shadow-md shadow-gray-300 rounded-md">
            <div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolore, excepturi.
              </p>
              <div className="flex mt-8 items-center ">
                <span>Shri Hari, BMI</span>
              </div>
            </div>
          </div>
          <div className="  w-[30%] z-40 items-start justify-start px-10 py-4 border bg-slate-50 border-gray-300 hover:shadow-md hover:shadow-gray-300 rounded-md">
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                voluptas.
              </p>
              <div className="flex mt-8 items-center ">
                <img
                  className="w-12 mr-8 rounded-md"
                  src="https://assets.splitwise.com/assets/home_page/logos/bi-97c1894e95b2a91c0027403ebda13eb65e2c5df8a303dd36e53cd0b013a0da9f.png"
                  alt=""
                />
                <span>Business Insider</span>
              </div>
            </div>
          </div>
        </div>

        {/* Last Bit Positioned at the Bottom */}
      </div>

      <div className="relative w-full bg-white pt-12">
        {/* Footer Content */}
        <div className="flex justify-center items-center py-2 bg-teal-500">
          <p className="text-center text-gray-600">
            © 2024 SplitApp. All rights reserved. | Privacy Policy | Terms of
            Service
          </p>
        </div>

        {/* Full-width Image */}
        <div className="w-full bg-teal-500"></div>
      </div>
    </div>
  );
};

export default Home;
