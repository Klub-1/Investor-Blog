import { Route, Routes } from "react-router-dom";

// Components
import { SideBar } from "./components/SideBar/SideBar";

// Views
import HomeView from "./views/HomeView";
import AddView from "./views/AddView";
import { SearchView } from "./views/SearchView";
import { StocksView } from "./views/StocksView";
import { AccountView } from "./views/AccountView";

function App() {
  return (
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
  );
}

export default App;
