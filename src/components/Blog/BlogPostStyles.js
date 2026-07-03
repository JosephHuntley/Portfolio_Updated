import styled from "styled-components";
import { Link } from "react-router-dom";

export const PostHeader = styled.header`
  padding: 40px 0 24px;
  text-align: center;
`;

export const PostTitle = styled.h1`
  color: #9cc9e3;
  font-size: 3.2rem;
  line-height: 1.25;

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 2.4rem;
  }
`;

export const PostMeta = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin-top: 12px;
  font-size: 1.4rem;
`;

export const PostBody = styled.div`
  max-width: 760px;
  margin: 0 auto;
  color: ${(props) => props.theme.colors.text};
  line-height: 1.7;
  font-size: 1.8rem;

  h2,
  h3 {
    color: #9cc9e3;
    margin: 32px 0 12px;
  }

  p {
    margin-bottom: 20px;
  }

  a {
    color: #d0bb57;
  }

  code {
    background: #212d45;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
  }

  pre {
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 20px;
  }

  pre code {
    background: none;
    padding: 0;
  }

  blockquote {
    border-left: 3px solid #9cc9e3;
    padding-left: 16px;
    color: rgba(255, 255, 255, 0.75);
    margin: 20px 0;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
  }

  ul {
    list-style: disc;
    margin: 0 0 20px 24px;
  }

  ol {
    list-style: decimal;
    margin: 0 0 20px 24px;
  }

  li {
    list-style: inherit;
    margin-bottom: 8px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 1.6rem;
  }
`;

export const BackLink = styled(Link)`
  display: inline-block;
  color: #9cc9e3;
  margin-top: 16px;
`;