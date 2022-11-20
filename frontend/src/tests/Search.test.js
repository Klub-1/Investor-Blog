import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createContext } from "react";
import { SearchView } from "../views/SearchView";

import { BlogPostStore } from "../stores/BlogPostStore";

export const StoreContext = createContext(null);

test("renders search view and checks for elements", () => {
  render(
    <StoreContext.Provider value={new BlogPostStore()}>
      <SearchView />
    </StoreContext.Provider>
  );
  const searchBar = document.getElementById("SearchInputField");
  expect(searchBar).toBeInTheDocument();
  const searchBarTitel = screen.getByText(/Search for a post/i);
  expect(searchBarTitel).toBeInTheDocument();
});
