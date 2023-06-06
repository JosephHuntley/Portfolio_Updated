import { useApolloClient, useQuery } from "@apollo/client";
import React from "react";
import { gql } from "@apollo/client";
import { CircleLoader } from "react-spinners";
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

import BlogImg from "../../../public/BlogCoverImage.webp";

const BLOG_QUERY = gql`
  {
    user(username: "JHuntley") {
      publication {
        posts {
          _id
          title
          brief
          isActive
          slug
          coverImage
        }
      }
    }
  }
`;

const Blog = () => {
  const { data, error, loading } = useQuery(BLOG_QUERY);

  if (loading)
    return (
      <Section id="blog">
        <CircleLoader color="#fff" size={100} loading={loading} />
      </Section>
    );
  if (error) return <pre id="blog">{error.message}</pre>;

  const posts = data.user.publication.posts.filter((post) => post.isActive);

  return (
    <Section id="blog">
      <SectionTitle main>Blog</SectionTitle>
      <Grid>
        {posts.map((post) => (
          <a
            key={post._id}
            href={`https://joehuntley.hashnode.dev/${post.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            <BlogCard>
              <Img
                alt={post.title}
                src={post.coverImage != "" ? post.coverImage : BlogImg}
              />
              <TitleContent>
                <HeaderThree>{post.title}</HeaderThree>
                <Hr />
              </TitleContent>
              <CardInfo className="card-info">{post.brief}</CardInfo>
            </BlogCard>
          </a>
        ))}
      </Grid>
      <SectionDivider />
    </Section>
  );
};

export default Blog;
