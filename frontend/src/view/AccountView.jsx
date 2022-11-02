import React from "react";

//fra øvelse 9 
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  //name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const token = getParameterByName("token");
if (token!=null && token.length>0){
  //Store token and redirect to baseURL
  localStorage.setItem("portal-jwt-Token",token);
  window.location.replace("/");
}

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
        onClick={getParameterByName("/login","localhost:8000")}
      >
        Login med CampusNet
      </button>
    </div>
  );
};
