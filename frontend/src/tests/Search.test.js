import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SearchView } from "../view/SearchView";
import App from "../App";

test("renders APP", () => {
    render(
        <SearchView />
    );
    const searchBar = screen.getByText(/APPL/i);

});
