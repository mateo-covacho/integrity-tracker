import React from "react";

import Link from "next/link";

import { Button, Panel, ButtonGroup, Tag, Callout, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment } from "@blueprintjs/core";
import { createBrowserSupabaseClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

// import "../styles/outline.css"
const Navbarcustom = (props: any) => {
  return (
    <Navbar style={{ position: "sticky", top: 0, zIndex: 999 }}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading style={{ height: "50%", width: "100%" }} className='my-auto'>
          <img className='m-auto' style={{ maxWidth: "100%", maxHeight: "100%" }} src='../resources/logo2.png' alt='integrity tracker logo' />
        </NavbarHeading>
      </NavbarGroup>

      <NavbarGroup align={Alignment.RIGHT}>
        <Button intent='primary' className='ms-3' style={{ margin: "auto" }} icon='plus'>
          Create post
        </Button>
        <Link href={`/profile/${props.userData?.id}`} className='ms-3' style={{ color: "inherit" }}>
          <Button color='blue' style={{ margin: "auto" }}>
            Profile
          </Button>
        </Link>

        <Button color='red' onClick={props.signout_function} className='ms-3' style={{ margin: "auto" }} intent='danger'>
          Sign out
        </Button>
        {/* 
					<Button
            color='blue'
            className='ms-3'
            style={{ margin: "auto" }}
            onClick={async () => {
              console.log(url);
              const endpointPath = "/api/posts/get_posts";
              const apiUrl = urljoin(url, endpointPath);
              console.log(apiUrl);
              const posts = await fetch(apiUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  // post_uuid: null,
                  // user_uuid: "f8686c99-f440-49b6-9334-5eda66cf562b",
                  // figure_uuid: null
                  post_uuid: null,
                  figure_uuid: "9f0f4a66-c2ef-4cd3-8364-04de12b5b993",
                  user_uuid: null,
                }),
              })
                .then((res) => res.json())
                .then((res) => {
                  return res.posts;
                });
              console.log(posts);
            }}
          >
            Get posts
          </Button> */}
      </NavbarGroup>
    </Navbar>
  );
};

export default Navbarcustom;
