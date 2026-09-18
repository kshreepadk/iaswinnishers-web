import { posts } from "@/content/blog-posts";

const BASE_URL = "https://iaswinnishers.com";

export default function sitemap() {
  const staticPages = [
    { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE_URL}/programs`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/resources`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/career-counselling`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/contact`, priority: 0.6, changeFrequency: "yearly" },
    { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: "weekly" },
  ];

  const blogPages = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  return [...staticPages, ...blogPages];
}
