import React from "react";
import { Card, Tag } from "@blueprintjs/core";
import { url } from "../utils/url";
import urljoin from "url-join";
import Link from "next/link";

interface PostProps {
  id: string;
  user_id: string;
  public_figure_id: string;
  title: string;
  content: string;
  evidence_links: string[];
  truth_score: number;
  created_at: string;
  updated_at: string;
  category: string[];
}

const Post = (props: PostProps) => {
  const endpointPath = `/categories/${props.post.category}`;
  const apiUrl = urljoin(url, endpointPath);
  return (
    <Card className='mt-3'>
      <h4>{props.post.title}</h4>
      <Link href={apiUrl}>
        <Tag>{props.post.category}</Tag>
      </Link>
      <p>{props.post.content}</p>
      <p>Truth Score: {props.post.truth_score}</p>
      <p>{new Date(props.post.created_at).toLocaleDateString()}</p>
      {props.post.evidence_links &&
        props.post.evidence_links.map((link, index) => (
          <a key={index} href={link} target='_blank'>
            Evidence Link {index + 1}
          </a>
        ))}
    </Card>
  );
};

export default Post;
