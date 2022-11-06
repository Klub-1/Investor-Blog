import { render, screen } from "@testing-library/react";
import { SearchView } from "../view/AccountView";
import '@testing-library/jest-dom'

test("renders login view and checks for elements", () => {
    render(
        <AccountView />
    );
    const login = document.getElementById("SearchInputField")
    expect(searchBar).toBeInTheDocument()
    const searchBarTitel = screen.getByText(/Search for a post/i)
    expect(searchBarTitel).toBeInTheDocument()

});
