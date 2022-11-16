import React from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { StoreContext } from "../App";

import BlogPost from "../components/BlogPost";

const HomeView = () => {
  const store = useContext(StoreContext);

  return (
    <div className="flex flex-col items-center justify-center overflow-y-scroll">
      {store.blogposts.map(
        (post) => (console.log(post), (<BlogPost key={post.id} post={post} />))
      )}
    </div>
  );
};

export default observer(HomeView);
