import "@testing-library/jest-dom";
import { API } from "../Api/api";
import AuthStore from "../stores/AuthStore";

import BlogPostStore from "../stores/BlogPostStore";

beforeAll(async () => {
  const api = new API();
  const users = await api.getAllUsers();

  const userExists = users.find((u) => u.email === "test_user@user.dk");

  if (!userExists) {
    await api.registerUser("test_user@user.dk", "test_user", "test");
  } else {
    await api.login("test_user@user.dk", "test");
  }

  AuthStore.checkAuth();
});

test("Filter blogposts", async () => {
  const randomNumber = Math.random() * Math.PI;

  await BlogPostStore.createBlogPost(
    "This is a test",
    "I'm writing a test",
    "TAG"
  );

  await BlogPostStore.createBlogPost(
    "This is a test " + randomNumber,
    "I'm writing a test",
    "TAG"
  );

  BlogPostStore.setFilterValue(randomNumber.toString());

  const filteredBlogPosts = BlogPostStore.filteredBlogPosts;

  expect(filteredBlogPosts.length).toBe(1);
});

test("Add interaction", async () => {
  await BlogPostStore.createBlogPost(
    "This is a test",
    "I'm writing a test",
    "TAG"
  );

  const count = BlogPostStore.blogposts.length;

  expect(count).toBeGreaterThan(0);
});
