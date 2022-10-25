import React, {useState} from "react";
import {BlogPost} from "../components/BlogPost";
import {BlogPostData} from "../Data/TestData/BlogPostData";


export const SearchView = () => {
    const [blogs, setBlogs] = useState(BlogPostData);

    const filterPosts = (e) => {
        const searchFor = e.target.value.toLowerCase();

        if (searchFor.length != 0) {
            // We have something to search for
            const filteredBlogsBody= BlogPostData.filter((blog) => {
                // Filter every body in lowercase to easier match
                return blog.body.toLowerCase().includes(searchFor);
            });
            setBlogs(filteredBlogsBody)
        } else {
            // Reset blog posts
            setBlogs(BlogPostData)
        }
    }

    return (
        <div>
            {/*  -----------Search Bar content ----------- */}


            <div className="h-[150px] w-full shadow rounded-lg bg-white mb-5 md:mb-10">
                <div className="h-4/6 flex justify-center items-center">
                    <h1 className="font-bold text-2xl md:text-4xl">Search for a post</h1>
                </div>
                <div className="flex justify-center">
                    <p class="text-gray-700 text-base mb-4">
                        Search by text in the description.
                    </p>

                </div>
                <div className="flex justify-center">
                    <input
                        type="text"
                        class="
                    form-control
                    block
                    w-half
                    px-4
                    py-2
                    text-xl
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="SearchInputField"
                        onChange={filterPosts}
                        placeholder="Search here..."/>
                </div>
            </div>
            {/*  -----------Sorted blog posts ----------- */}
            <div className="flex flex-col items-center justify-center overflow-y-scroll">
                {blogs.map((post) => (
                    <BlogPost {...post} />
                ))}
            </div>
        </div>
    );
}
