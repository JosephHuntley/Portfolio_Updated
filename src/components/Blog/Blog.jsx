import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BlogCard,
  HeaderThree,
  TitleContent,
  Hr,
  Grid,
  Img,
  CardInfo,
  Pagination,
  PageButton,
  PageInfo,
} from "./BlogStyles";
import {
  SectionDivider,
  SectionTitle,
  Section,
} from "../../styles/globalComponents";
import { getAllPosts } from "../../lib/posts";

import BlogImg from "../../../public/BlogCoverImage.webp";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const posts = getAllPosts();
  const [page, setPage] = useState(1);

  if (posts.length === 0) return null;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE);

  const goToPage = (next) => {
    setPage(next);
    document.getElementById("blog")?.scrollIntoView({ block: "start" });
  };

  return (
    <Section id="blog">
      <SectionTitle main>Blog</SectionTitle>
      <Grid>
        {visiblePosts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`}>
            <BlogCard>
              <Img
                alt={post.title}
                src={post.coverImage ? post.coverImage : BlogImg}
              />
              <TitleContent>
                <HeaderThree>{post.title}</HeaderThree>
                <Hr />
              </TitleContent>
              <CardInfo className="card-info">{post.excerpt}</CardInfo>
            </BlogCard>
          </Link>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Pagination>
          <PageButton onClick={() => goToPage(page - 1)} disabled={page === 1}>
            Prev
          </PageButton>
          <PageInfo>
            Page {page} of {totalPages}
          </PageInfo>
          <PageButton
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </PageButton>
        </Pagination>
      )}
      <SectionDivider />
    </Section>
  );
};

export default Blog;