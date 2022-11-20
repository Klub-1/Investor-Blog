import { render, screen } from "@testing-library/react";
import { SearchView } from "../views/SearchView";
import "@testing-library/jest-dom";

test("renders search view and checks for elements", () => {
  render(<SearchView />);
  const searchBar = document.getElementById("SearchInputField");
  expect(searchBar).toBeInTheDocument();
  const searchBarTitel = screen.getByText(/Search for a post/i);
  expect(searchBarTitel).toBeInTheDocument();
});
