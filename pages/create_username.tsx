import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/document";
import {
  Button,
  Container,
  Header,
  Content,
  Footer,
  Nav,
  Sidebar,
  Sidenav,
  Grid,
  Row,
  Col,
  Panel,
  Placeholder,
  Stack,
  ButtonGroup,
  Tag,
  TagGroup,
  Input,
  FlexboxGrid,
} from "rsuite";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import "rsuite/dist/rsuite.min.css";
import { print } from "@/utils/print";

function Create_username(props) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [username, setUsername] = useState();
  const router = useRouter();

  print("red", new Date("dd/mm/yyyy"));
  //console.log(props.user);
  // useEffect(() => {
  //   async function loadData() {
  //     const { data } = await supabaseClient.from("public_figures").select("*");
  //     console.log({ data });
  //     setData(data);
  //   }
  //   // Only run query once user is logged in.
  //   if (user) loadData();
  // }, [user]);

  // useEffect(() => {}, [user, router]);
  // console.log(user);
  return (
    <>
      <Container>
        <FlexboxGrid justify='center' align='middle' style={{ height: "100vh" }}>
          <FlexboxGrid.Item colspan={12}>
            <Input
              placeholder='username'
              value={username}
              onChange={(value: string) => {
                setUsername(value);
              }}
            />
            <br />
            <Button
              appearance='primary'
              block
              onClick={async () => {
                if (!username) {
                  alert("Please enter a username");
                } else if (username.length < 3) {
                  alert("Username must be at least 3 characters long");
                } else {
                  // check if username is taken
                  print("green", `Checking if ${username} is taken...`);
                  const valid_username = await fetch(`http://localhost:3000/api/users/username_check?username=${username}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      username: username,
                    }),
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      return res.valid;
                    });

                  print("green", `Username valid: ${valid_username}`);
                  if (valid_username) {
                    const response = await fetch(`http://localhost:3000/api/users/create_user`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        user_uuid: user?.id,
                        username: username,
                        email: props.user.email,
                        profile_pic: user?.user_metadata.avatar_url,
                        bio: "Hi there! I'm new to this app",
                        tags: "new user",
                        joined: new Date().toDateString(),
                      }),
                    });
                  } else {
                    alert("Username is already taken");
                  }
                }
              }}
            >
              Set username
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // print("green", JSON.stringify(session, null, 2));
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Check if user has a table entry
  const has_table_entry = await fetch(`http://localhost:3000/api/users/usertable_exists?uuid=${session.user.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.exists;
    });
  if (has_table_entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    props: {
      user: "user",
    },
  };
};

export default Create_username;
