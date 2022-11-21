import { API } from "../Api/api";
import "@testing-library/jest-dom";

test("Get blogposts from API", () => {
  const api = new API();

  const blogposts = api.getBlogPosts().then((data) => {
    return data;
  });

  expect(blogposts).not.toBeNull();
});
