import { Head } from "next/document";
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

const supabaseClient = createBrowserSupabaseClient();

const inter = Inter({ subsets: ["latin"] });

const Home = (props) => {
  const userData = useUser();
  // console.log(userData);

  // console.log(props.public_figures);

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
                  {/* {userData.user ? (
                    <Button color='red' appearance='ghost' style={{ margin: "auto" }}>
                      <a href='/api/auth/logout' style={{ color: "inherit" }}>
                        logout
                      </a>
                    </Button>
                  ) : (
                  <Button color='red' appearance='ghost' style={{ margin: "auto" }}>
                    <a href='/api/auth/login' style={{ color: "inherit" }}>
                      login
                    </a>
                  </Button>
                   )} */}

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

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
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
