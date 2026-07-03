import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

import { getPostBySlug } from "../../lib/posts";
import { Section, SectionDivider } from "../../styles/globalComponents";
import {
  PostHeader,
  PostTitle,
  PostMeta,
  PostBody,
  BackLink,
} from "./BlogPostStyles";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    document.title = post ? `${post.title} | Joseph Huntley` : "Post not found";
  }, [post]);

  if (!post) {
    return (
      <Section nopadding>
        <PostHeader>
          <PostTitle>Post not found</PostTitle>
        </PostHeader>
        <BackLink to="/blog">&larr; Back to all posts</BackLink>
      </Section>
    );
  }

  return (
    <Section nopadding>
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>{formatDate(post.date)}</PostMeta>
      </PostHeader>
      <PostBody>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </PostBody>
      <SectionDivider />
      <BackLink to="/blog">&larr; Back to all posts</BackLink>
    </Section>
  );
};

export default BlogPost;