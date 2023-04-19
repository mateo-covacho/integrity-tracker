import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
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
} from "rsuite";
import { createBrowserSupabaseClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const supabaseClient = createBrowserSupabaseClient();

const inter = Inter({ subsets: ["latin"] });

const Home = (props: any) => {
  const userData = useUser();
  const router = useRouter();
  const user = useUser();
  // console.log(userData);

  // console.log(props.public_figures);
  useEffect(() => {
    if (!user) {
      console.log(user);
      if (!user) {
        router.push("/login");
      }
    }
  }, [user]);
  return (
    <Container style={{ height: "100vh" }}>
      <Header>
        <Nav>
          <Nav.Item>Home</Nav.Item>
          <Nav.Item>About</Nav.Item>
          <Nav.Item>People</Nav.Item>
        </Nav>
      </Header>
      <Container style={{ height: "100%" }}>
        <Row>
          <Col xs={6} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Sidenav style={{ height: "100%" }}>
              <Sidenav.Body style={{ height: "100%" }}>
                <Nav style={{ textAlign: "center" }}>
                  {/*  login Button */}

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
          <Col xs={12}>
            <Grid fluid>
              <Row>
                <Row>
                  <Col xsOffset={2} xs={20}>
                    <Panel
                      className={styles.panel}
                      bordered
                      header={
                        <Stack justifyContent='space-between'>
                          <span>FIrst post</span>
                        </Stack>
                      }
                    >
                      <Placeholder.Paragraph rows={5} graph='image' />
                    </Panel>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xsOffset={2} xs={20}>
                    <Panel
                      className={styles.panel}
                      bordered
                      header={
                        <Stack justifyContent='space-between'>
                          <span>FIrst post</span>
                        </Stack>
                      }
                    >
                      <Placeholder.Paragraph rows={5} graph='image' />
                    </Panel>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xsOffset={2} xs={20}>
                    <Panel
                      className={styles.panel}
                      bordered
                      header={
                        <Stack justifyContent='space-between'>
                          <span>FIrst post</span>
                        </Stack>
                      }
                    >
                      <Placeholder.Paragraph rows={5} graph='image' />
                    </Panel>
                  </Col>
                </Row>
                <br />
              </Row>
            </Grid>
          </Col>
          <Col xs={6} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Sidenav>
              <Sidenav.Header>Dashboard</Sidenav.Header>
              <Sidenav.Body>
                <br />

                <Link href={`/profile/${userData?.id}`} style={{ color: "inherit" }}>
                  <Button color='blue' appearance='ghost' style={{ margin: "auto" }}>
                    Profile
                  </Button>
                </Link>
                <br />
                <br />
                <Button
                  color='blue'
                  appearance='ghost'
                  style={{ margin: "auto" }}
                  onClick={async () => {
                    const posts = await fetch("${process.env.ROOT_LINK}/api/posts/get_posts", {
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
                  get posts
                </Button>
                <br />
                <br />
                <Button color='red' appearance='primary' onClick={() => supabaseClient.auth.signOut()} style={{ margin: "auto" }}>
                  Sign out
                </Button>
              </Sidenav.Body>
            </Sidenav>
          </Col>
        </Row>
      </Container>
      <Footer>
        <p>© 2023 My Platform</p>
      </Footer>
    </Container>
  );
};

export const getServerSideProps = async (ctx: object) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx as any);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const getUserData = await supabase.auth.getUser();

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // const { public_figures } = await supabaseClient.from("public_figures").select("*");

  return {
    props: {
      initialSession: session,
      // public_figures: public_figures,
      UserData: getUserData.data.user,
    },
  };
};

export default Home;
