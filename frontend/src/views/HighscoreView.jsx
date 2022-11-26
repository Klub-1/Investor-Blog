import React from "react";
import { API } from "../Api/api";
import { useState } from "react";

let api = new API();
const allScores = [];
// const [allScores, setallScores] = useState([]);

console.log("Hejsa")

api.getAllUsers().then((users) => {
    console.log(users)
    let scores = []
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let username = user.username
        let postsAmount = user.blogposts.length
        let commentsAmount = user.comments.length
        let scoreMap = {
            'username': username,
            'posts': postsAmount,
            'comments': commentsAmount,
        }

        scores.push(scoreMap)
    }
    console.log("Setting scores for all")
    allScores.push(scores)
});

export const HighscoreView = () => {

    return (
        <div>
            {/*  -----------Search Bar content ----------- */}

            <div className="h-fit w-full shadow rounded-lg bg-white mb-5 md:mb-10 p-3">
                <div className="h-4/6 flex justify-center items-center p-3">
                    <h1 className="font-bold text-2xl md:text-4xl">User highscores</h1>
                </div>
                <div className="flex justify-center">
                    <p className="text-gray-700 text-base mb-4">
                        See the most active users!
                    </p>
                </div>
                {/*  -----------Sorted highscores ----------- */}
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Username
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                # of blogposts
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                # of comments
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allScores.map((user, index) => (
                                            <tr className="bg-gray-100 border-b">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {user.username}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {user.posts}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {user.comments}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};