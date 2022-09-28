import { Route, Routes } from "react-router-dom";

import "./App.css";

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
    <div className="App">
      <SideBar />
      <div className="content">
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
