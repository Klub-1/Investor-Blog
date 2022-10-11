import { Route, Routes } from "react-router-dom";

// Components
import { SideBar } from "./components/SideBar/SideBar";

// Views
import { HomeView } from "./view/HomeView";
import { AddView } from "./view/AddView";
import { SearchView } from "./view/SearchView";
import { StocksView } from "./view/StocksView";
import { AccountView } from "./view/AccountView";

function App() {
  return (
    <div className="flex w-full h-full absolute">
      <SideBar />
      <div className="flex-1 m-5 md:m-10 bg-teal-500">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/add" element={<AddView />} />
          <Route path="/search" element={<SearchView />} />
          <Route path="/stocks" element={<StocksView />} />
          <Route path="/account" element={<AccountView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
