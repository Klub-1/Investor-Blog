import React from "react";

export const AddView = () => {
  return (
    <div className="h-fit w-full shadow rounded-lg bg-white mb-5 md:mb-10">
      <div className="p-3">
        <h1 className="w-full text-center font-bold text-2xl md:text-4xl mb-6 mt-3">
          Her kan du oprette et nyt indlæg!
        </h1>
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 mb-3"
          placeholder="Titel"
        />
        <textarea
          type="text"
          rows={8}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
          placeholder="Indlæg"
        />
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 mt-3"
          placeholder="Tags (F.eks.: APPL, Positivt, Køb)"
        />
      </div>
      <button
        className="w-full h-1/4 bg-[#7382D9] rounded-b-lg text-white p-2 font-extrabold text-xl"
        onClick={() => console.log("Add comment")}
      >
        Opret indlæg
      </button>
    </div>
  );
};
