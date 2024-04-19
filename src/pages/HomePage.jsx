import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-dvh flex flex-col  items-center ">
      <div className="mt-[200px]  w-1/3 h-1/4 flex flex-col justify-around items-center ">
        <h1>WELCOME TO EQUIZ</h1>
        <div className="w-full flex justify-around">
          <button className="px-3 py-2 border rounded-md opacity-55 hover:opacity-100">
            LOGIN
          </button>
          <button className="px-3 py-2 border rounded-md opacity-55 hover:opacity-100">
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
