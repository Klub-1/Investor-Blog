import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

test("renders APP", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
