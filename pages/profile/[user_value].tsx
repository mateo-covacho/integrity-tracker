import { Container, Sidenav, Nav, Button, Header, Content, Footer, Row, Col, Panel, Timeline, Tag, Avatar, List } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { differenceInSeconds } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { useRouter } from "next/router";
import { print } from "@/utils/print";
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const UserProfile = (props: any) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [data, setData] = useState();
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Post 1",
      content: "This is the content of post 1",
      tags: ["tag1", "tag2"],
      created: "2021-08-01",
      author: "asdasda",
    },
  ]);

  const supabase = createBrowserSupabaseClient();

  // useEffect(() => {

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    console.log(props.data[0]);
  });

  const user_profile = props.data[0];

	console.log(user_profile )


 return (
    <Container>
      <Header>
        <h2>User Profile</h2>
      </Header>
      <Content>
        <Row gutter={16}>
          <Col xs={9} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Sidenav style={{ height: "100%" }}>
              <Sidenav.Body style={{ height: "100%" }}>
                <Nav style={{ textAlign: "center" }}>
                  {/* home button  */}
                  <br />
                  <br />
                  <Button color='red' appearance='primary' onClick={() => supabaseClient.auth.signOut()} style={{ margin: "auto" }}>
                    Sign out
                  </Button>
                  <Link href='/' style={{ color: "inherit" }}>
                    <Button color='green' appearance='ghost' style={{ margin: "auto" }}>
                      home
                    </Button>
                  </Link>
                  <br />
                  <br />

                  <hr />
                  <Button appearance='subtle' block>
                    Politics
                  </Button>
                  <Button appearance='subtle' block>
                    Finance
                  </Button>
                  <Button appearance='subtle' block>
                    Business
                  </Button>
                  <Button appearance='subtle' block>
                    Academia
                  </Button>
                  <Button appearance='subtle' block>
                    Journalists
                  </Button>
                  <Button appearance='subtle' block>
                    Non-profits
                  </Button>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Col>
          <Col xs={15}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar size='lg' src={user_profile.profile_pic} style={{ marginRight: "20px" }} />
              <div>
                <h2 style={{ marginBottom: "10px" }}>{user_profile.username}</h2>
                <p style={{ marginBottom: "10px" }}>{user_profile.bio}</p>
                <div style={{ marginBottom: "10px" }}>
                  {user_profile.tags.map((tag: any) => (
                    <Tag color='cyan' key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>
                <Timeline>
                  <Timeline.Item>{`Joined on ${user_profile.joined}`}</Timeline.Item>
                </Timeline>
              </div>
            </div>
            <List>
              {posts.map((post) => (
                <List.Item key={post.id}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* @ts-ignore */}
                    <Avatar size='sm' src={post.author.profile_pic} style={{ marginRight: "10px" }} />
                    <div>
                      <h4 style={{ marginBottom: "5px" }}>{post.title}</h4>
                      <p style={{ marginBottom: "0px" }}>{post.content}</p>
                      <div>
                        {post.tags.map((tag) => (
                          <Tag color='cyan' key={tag} style={{ marginRight: "5px" }}>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                      <Timeline style={{ marginTop: "5px" }}>
                        <Timeline.Item>{`Posted on ${post.created}`}</Timeline.Item>
                      </Timeline>
                    </div>
                  </div>
                </List.Item>
              ))}
            </List>
          </Col>
        </Row>
      </Content>
      <Footer>
        <p>Copyright © 2023</p>
      </Footer>
    </Container>
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
  
	// get user posts
	
	 

  print("blue", "_________________________________________________________");

  return { 
    props: {
      data,
    },
  };
};
export default UserProfile;
