import React from "react";

import Link from "next/link";

import {
  Button,
  Panel,
  ButtonGroup,
  Tag,
  Callout,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Alignment,
  Menu,
  MenuItem,
  MenuDivider,
  Card,
} from "@blueprintjs/core";
import { createBrowserSupabaseClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { hideContextMenu, showContextMenu } from "@blueprintjs/popover2";
import { Example, ExampleProps } from "@blueprintjs/docs-theme";

import ProfilePicture from "@/lib/ProfilePicture";
// import "../styles/outline.css"
const Navbarcustom = (props: any) => {
  return (
    <Navbar style={{ position: "sticky", top: 0, zIndex: 999 }}>
      <Link href='/'>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading style={{ height: "50%", width: "100%" }} className='my-auto'>
            <img className='m-auto' style={{ maxWidth: "100%", maxHeight: "100%" }} src='../resources/logo2.png' alt='integrity tracker logo' />
          </NavbarHeading>
        </NavbarGroup>
      </Link>

      <NavbarGroup align={Alignment.RIGHT}>
        <Link href='/'>
          <Button icon='home' text='Home' minimal={true} />
        </Link>

        <ProfilePicture imageUrl={props.userData?.user_metadata.avatar_url} signout_function={props.signout_function} userData={props.userData} />
        <br />
      </NavbarGroup>
    </Navbar>
  );
};

export default Navbarcustom;
