import { Alignment, Button, Card, Menu, MenuItem, Navbar, NavbarGroup, NavbarHeading, Tag } from "@blueprintjs/core";
import "rsuite/dist/rsuite.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { differenceInSeconds } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { useRouter } from "next/router";
import { print } from "@/utils/print";
import Post from "@/lib/Post";
import urljoin from "url-join";
import Sidemenu from "@/lib/Sidemenu";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const Category = (props: any) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [data, setData] = useState();
  const [posts, setPosts] = useState(props.posts.data);

  const supabase = createBrowserSupabaseClient();

  // useEffect(() => {
  //   if (!user) {
  //     console.log(user);
  //     if (!user) {
  //       router.push("/login");
  //     }
  //   }
  // }, [user]);

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <div style={{ width: "100vw" }}>
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>User Profile</NavbarHeading>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <Link className='ms-3' href='/' style={{ color: "inherit" }}>
            <Button intent='none' style={{ margin: "auto" }}>
              Home
            </Button>
          </Link>
          <Button className='ms-3' intent='danger' onClick={() => supabaseClient.auth.signOut()} style={{ margin: "auto" }}>
            Sign out
          </Button>
        </NavbarGroup>
      </Navbar>
      <Container>
        <Row style={{ height: "100vh" }}>
          <Sidemenu />

          <Col xs={9}>{posts && posts.length > 0 && posts.map((post: any) => <Post post={post} />)}</Col>
        </Row>
      </Container>
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  print("blue", "/profile/[category].tsx:getServerSideProps");
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx as any);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //console.log(user);

  const category = ctx.params.category;

  print("red", category);

  const user_data = await supabase.from("users").select("id").eq("id", category);
  // console.log(user_data);
  if (user_data.error === null) {
    //create user table
    // @ts-ignore
    // create_user(user_uuid);
  }

  // get user posts
  const posts = await supabase.from("posts").select("*").eq("category", category);
  print("orange", JSON.stringify(posts, null, 2));

  print("blue", "_________________________________________________________");

  return {
    props: {
      posts,
    },
  };
};
export default Category;
