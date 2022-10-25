import React from "react";

export const AccountView = () => {
  return (
    <div className="h-[400px] w-full shadow rounded-lg bg-white mb-5 md:mb-10">
      <div className="h-4/5 flex justify-center items-center">
        <h1 className="h-max w-full text-center font-semibold text-4xl content-center md:text-8xl">
          InvestorBlog
        </h1>
      </div>
      <button
        className="w-full h-1/5 bg-[#7382D9]  rounded-b-lg text-white p-2 font-extrabold text-xl"
        onClick={() => console.log("Login")}
      >
        Login med CampusNet
      </button>
    </div>
  );
};
