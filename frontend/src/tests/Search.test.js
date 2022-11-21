import "@testing-library/jest-dom";

import { BlogPostStore } from "../stores/BlogPostStore";

test("Filter blogposts", () => {
  const blogpostStore = new BlogPostStore();

  blogpostStore.createBlogPost("This is a test", "I'm writing a test", "TAG");

  blogpostStore.createBlogPost(
    "This is another test",
    "I'm writing another test",
    "TAG, TAG2, TAG3"
  );

  blogpostStore.setFilterValue("another");

  expect(blogpostStore.filteredBlogPosts.length).toBe(1);
});


test("Add interaction", () => {
  const blogpostStore = new BlogPostStore();

  blogpostStore.createBlogPost("This is a test", "I'm writing a test", "TAG");

  blogpostStore.createBlogPost(
    "This is another test",
    "I'm writing another test",
    "TAG, TAG2, TAG3"
  );

  blogpostStore.setFilterValue("another");

  expect(blogpostStore.filteredBlogPosts.length).toBe(1);
});