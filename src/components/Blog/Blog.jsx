import { Link } from "react-router-dom";
import {
  BlogCard,
  HeaderThree,
  TitleContent,
  Hr,
  Grid,
  Img,
  CardInfo,
} from "./BlogStyles";
import {
  SectionDivider,
  SectionTitle,
  Section,
} from "../../styles/globalComponents";
import { getAllPosts } from "../../lib/posts";

import BlogImg from "../../../public/BlogCoverImage.webp";

const Blog = () => {
  const posts = getAllPosts();

  if (posts.length === 0) return null;

  return (
    <Section id="blog">
      <SectionTitle main>Blog</SectionTitle>
      <Grid>
        {posts.map((post) => (
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
      <SectionDivider />
    </Section>
  );
};

export default Blog;