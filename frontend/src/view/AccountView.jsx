import React from "react";
import  { useEffect, useState } from "react"


function About() {
  // 👇️ using window.location.href 👇️
  window.location.href = 'https://investorblog.diplomportal.dk/api/login';
  return null;
}


export const AccountView = () => {

  const [users, setUsers] = useState([])

  const fetchData = () => {
    fetch("https://investorblog.diplomportal.dk/api/verify?token=" + localStorage.getItem("portal-jwt-Token"))
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(data => {
      console.log(data)
      setUsers(data)
    })
}
  useEffect(() => {
    fetchData()
  }, [])
  if(!localStorage.getItem('portal-jwt-Token') || users === "Token expired" || users === "Invalid token") {
  return (
    <div className="h-[400px] w-full shadow rounded-lg bg-white mb-5 md:mb-10">
      <div className="h-4/5 flex justify-center items-center">
        <h1 className="h-max w-full text-center font-semibold text-4xl content-center md:text-8xl">
          InvestorBlog
        </h1>
      </div>
      <button
        className="w-full h-1/5 bg-[#7382D9]  rounded-b-lg text-white p-2 font-extrabold text-xl"
        onClick={About}
      >
        Login med CampusNet
      </button>
    </div>
  );}
  else{
    return(
    <div className="h-[400px] w-full shadow rounded-lg bg-white mb-5 md:mb-10">
    <div className="h-4/5 flex justify-center items-center">
    <h1 className="h-max w-full text-center font-semibold text-4xl content-center md:text-8xl">
          your user = {users.id} 
        </h1>
    </div>
  </div>
    )
  }
};
