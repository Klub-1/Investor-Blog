import "@testing-library/jest-dom";
import { BlogPost } from "../models/BlogPost";

import BlogPostStore from "../stores/BlogPostStore";

test("Filter blogposts", () => {
  BlogPostStore.blogposts = [];

  const id1 = Math.random() * Math.PI;
  const blogpost1 = new BlogPost(
    id1,
    id1,
    "Blogpost " + id1,
    "Content " + id1,
    "",
    [],
    []
  );

  BlogPostStore.pushToBlogposts(blogpost1);

  const id2 = Math.random() * Math.PI;
  const blogpost2 = new BlogPost(
    id2,
    id2,
    "Blogpost " + id2,
    "Content " + id2,
    "",
    [],
    []
  );

  BlogPostStore.pushToBlogposts(blogpost2);

  BlogPostStore.setFilterValue(id2.toString());

  const filteredBlogPosts = BlogPostStore.filteredBlogPosts;

  expect(filteredBlogPosts.length).toBe(1);
});

test("Add interaction", () => {
  const id1 = Math.random() * Math.PI;
  const blogpost1 = new BlogPost(
    id1,
    id1,
    "Blogpost " + id1,
    "Content " + id1,
    "",
    [],
    []
  );

  BlogPostStore.pushToBlogposts(blogpost1);

  const count = BlogPostStore.blogposts.length;

  expect(count).toBeGreaterThan(0);
});
