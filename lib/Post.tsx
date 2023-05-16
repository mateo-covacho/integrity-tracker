import React from "react";
import { Alignment, Button, Card, Menu, MenuItem, Navbar, NavbarGroup, NavbarHeading, Tag } from "@blueprintjs/core";

const Post = (post: any) => {
  return (
    <Card className='my-4'>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <h4 style={{ marginBottom: "5px" }}>{post.title}</h4>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ width: "100%", height: "auto" }} />}
          <p style={{ marginBottom: "0px" }}>{post.content}</p>
          <div>
            {post.tags?.map((tag: any) => (
              <Tag intent='primary' key={tag} style={{ marginRight: "5px" }}>
                {tag}
              </Tag>
            ))}
          </div>

          <h5 style={{ marginTop: "5px" }}>{`Posted on ${post.created_at}`}</h5>
        </div>
      </div>
    </Card>
  );
};

export default Post;
