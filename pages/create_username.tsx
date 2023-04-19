import { useRouter } from "next/router";
import Image from "next/image";
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

function Create_username(props: any) {
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
                // @ts-ignore
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
                  // @ts-ignore
                } else if (username.length < 3) {
                  alert("Username must be at least 3 characters long");
                } else {
                  // check if username is taken
                  print("green", `Checking if ${username} is taken...`);
                  const valid_username = await fetch(
                    `https://mateo-covacho-musical-carnival-gwj6rrjww6p2wv76-3000.preview.app.github.dev/api/users/username_check?username=${username}`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
												'Accept': 'application/json',
                      },
                      body: JSON.stringify({
                        username: username,
                      }),
                    }
                  )
                    .then((res) => res.json())
                    .then((res) => {
                      return res.valid;
                    });

                  print("green", `Username valid: ${valid_username}`);
                  if (valid_username) {
                    const response = await fetch(
                      `https://mateo-covacho-musical-carnival-gwj6rrjww6p2wv76-3000.preview.app.github.dev/api/users/create_user`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
													'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                          user_uuid: user?.id,
                          username: username,
                          email: user?.email,
                          profile_pic: user?.user_metadata.avatar_url,
                          bio: "Hi there! I'm new to this app",
                          tags: ["new user"],
                          joined: new Date().toDateString(),
                        }),
                      }
                    )
                      .then((res) => res.json())
                      .then((res) => {
                        return res;
                      });
                    print("green", response);
                    if (response.statusText === "Created") {
                      router.push("/");
                    } else {
                      alert("Something went wrong. check console for more info");
                      print("red", response);
                    }
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

export const getServerSideProps = async (ctx: object) => {
  // Create authenticated Supabase Client

  const supabase = createServerSupabaseClient(ctx as any);
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
	let has_table_entry = false
  // Check if user has a table entry
  has_table_entry = await fetch(
    `https://mateo-covacho-musical-carnival-gwj6rrjww6p2wv76-3000.preview.app.github.dev/api/users/usertable_exists?uuid=${session.user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
				'Accept': 'application/json',

		},
    }
  )
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
