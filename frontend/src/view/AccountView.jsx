import React from "react";
import { useEffect, useState } from "react";

function About() {
  // 👇️ using window.location.href 👇️
  window.location.href = "https://investorblog.diplomportal.dk/api/login";
  return null;
}

export const AccountView = () => {
  const [users, setUsers] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const fetchData = () => {
    fetch(
      "https://investorblog.diplomportal.dk/api/verify?token=" +
        localStorage.getItem("portal-jwt-Token")
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (
    !localStorage.getItem("portal-jwt-Token") ||
    users === "Token expired" ||
    users === "Invalid token"
  ) {
    return (
      <div className="h-[400px] w-full shadow rounded-lg bg-white mb-5 md:mb-10">
        <div className="h-4/5 w-full grid">
          <h1 className="h-max w-full text-center font-semibold text-4xl content-center md:text-8xl mt-4">
            InvestorBlog
          </h1>
          {showLogin ? (
            <div className="h-full w-full p-2">
              {showRegister ? (
                <input
                  type="Username"
                  class="h-fit w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 mt-3 rounded-lg"
                  placeholder="Brugernavn"
                />
              ) : null}

              <input
                type="Email"
                class="h-fit w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 mt-3 rounded-lg"
                placeholder="Email"
              />

              <input
                type="Password"
                class="h-fit w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm p-2.5 mt-3 rounded-lg"
                placeholder="Password"
              />
            </div>
          ) : null}
        </div>

        {showLogin ? (
          <div>
            <button
              className="w-full h-full bg-[#7382D9] rounded-t-lg text-white p-2 font-extrabold text-xl"
              onClick={() => setShowRegister(!showRegister)}
            >
              {showRegister ? "Login" : "Registrer"}
            </button>
            <div className="h-0.5 w-full bg-white"></div>
          </div>
        ) : null}

        <div className="flex h-1/5 w-full">
          <button
            className="w-full h-full bg-[#7382D9] rounded-bl-lg text-white p-2 font-extrabold text-xl"
            onClick={() => {
              setShowLogin(!showLogin);
              if (!showLogin) {
                setShowRegister(false);
              }
            }}
          >
            {showLogin ? "Annulér" : "Login"}
          </button>

          <div className="h-full w-1 bg-white"></div>

          <button
            className="w-full h-full bg-[#7382D9] rounded-br-lg text-white p-2 font-extrabold text-xl"
            onClick={About}
          >
            {showLogin
              ? showRegister
                ? "Opret konto"
                : "Login"
              : "Login med CanpusNet"}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-[400px] w-full shadow rounded-lg bg-white mb-5 md:mb-10">
        <div className="h-4/5 flex justify-center items-center">
          <h1 className="h-max w-full text-center font-semibold text-4xl content-center md:text-8xl">
            your user = {users.id}
          </h1>
        </div>
      </div>
    );
  }
};
