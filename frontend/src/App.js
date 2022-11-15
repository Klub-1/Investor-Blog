import { Route, Routes } from "react-router-dom";
import { createContext } from "react";

// Components
import { SideBar } from "./components/SideBar/SideBar";

// Views
import HomeView from "./view/HomeView";
import { AddView } from "./view/AddView";
import { SearchView } from "./view/SearchView";
import { StocksView } from "./view/StocksView";
import { AccountView } from "./view/AccountView";
import { BlogPostStore } from "./stores/BlogPostStore";

// SOURCE: https://jsguild.com/how-to-setup-mobx-with-react-in-2021/
export const StoreContext = createContext(null);

function App() {
  return (
    <StoreContext.Provider value={new BlogPostStore()}>
      <div className="flex w-full h-full absolute">
        <SideBar />
        <div className="flex-1 m-5 md:m-10">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/add" element={<AddView />} />
            <Route path="/search" element={<SearchView />} />
            <Route path="/stocks" element={<StocksView />} />
            <Route path="/account" element={<AccountView />} />
          </Routes>
        </div>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
