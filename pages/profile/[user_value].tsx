import { Alignment, Button, Card, Menu, MenuItem, Navbar, NavbarGroup, NavbarHeading, Tag } from "@blueprintjs/core";

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
import { sign_out } from "@/pages/index";
import Navbarcustom from "@/lib/Navbarcustom";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const UserProfile = (props: any) => {
  const supabaseClient = useSupabaseClient();
  const userData = useUser();
  const router = useRouter();
  const [data, setData] = useState();
  const [posts, setPosts] = useState(props.posts.data);

  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    if (!userData) {
      console.log(userData);
      if (!userData) {
        router.push("/login");
      }
    }
  }, [userData]);

  useEffect(() => {
    console.log(props);
  }, [props]);
  const user_profile = props.data[0];

  return (
    <div style={{ width: "100vw" }}>
      <Navbarcustom style={{ position: "absolute" }} userData={userData} signout_function={sign_out} />

      <Container>
        <Row style={{ height: "100vh" }}>
          <Sidemenu />

          <Col xs={9}>
            <Card style={{ minHeight: "20vh" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={user_profile.profile_pic} style={{ marginRight: "20px" }} />
                <div>
                  <h2 style={{ marginBottom: "10px" }}>{user_profile.username}</h2>
                  <p style={{ marginBottom: "10px" }}>{user_profile.bio}</p>
                  <div style={{ marginBottom: "10px" }}>
                    {user_profile.tags.map((tag: any) => (
                      <Tag intent='primary' key={tag} style={{ marginRight: "5px" }}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <h5>{`Joined on ${user_profile.joined}`}</h5>
                </div>
              </div>
              <br />
            </Card>
            {posts && posts.length > 0 && posts.map((post: any) => <Post key={post.id} post={post} />)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  print("blue", "/profile/[user_value].tsx:getServerSideProps");
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

  const user_value = ctx.params.user_value;

  console.log("red", user_value);

  const user_data = await supabase.from("users").select("id").eq("id", user_value);
  // console.log(user_data);
  if (user_data.error === null) {
    //create user table
    // @ts-ignore
    // create_user(user_uuid);
  }

  const profile_data = async function load_profile_data(value: string) {
    if (uuidRegex.test(value)) {
      print("yellow", "uuid profile search");
      const { data, error } = await supabase.from("users").select("*").eq("id", value);
      return data;
    } else {
      print("yellow", "username profile search");
      const { data, error } = await supabase.from("users").select("*").eq("username", value);
      return data;
    }
  };

  const data = await profile_data(user_value);
  print("red", data);

  let id;
  try {
    // @ts-ignore
    id = data[0].id;
  } catch (error) {
    return {
      redirect: {
        destination: "/create_username",
        permanent: false,
      },
    };
  }

  // get user posts
  const posts = await supabase.from("posts").select("*").eq("user_id", id);
  print("orange", JSON.stringify(posts, null, 2));

  print("blue", "_________________________________________________________");

  return {
    props: {
      data,
      posts,
    },
  };
};
export default UserProfile;
