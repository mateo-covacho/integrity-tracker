import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { createBrowserSupabaseClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const supabaseClient = createBrowserSupabaseClient();

import { Button, Panel, ButtonGroup, Tag } from "@blueprintjs/core";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import Head from "next/head";

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
      <div>
        <Nav>
          <Nav.Item>Home</Nav.Item>
          <Nav.Item>About</Nav.Item>
          <Nav.Item>People</Nav.Item>
        </Nav>
      </div>
      <Container style={{ height: "100%" }}>
        <Row>
          <Col xs={6} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ height: "100%" }}>
              <div style={{ height: "100%" }}>
                <Nav style={{ textAlign: "center" }}>
                  {/*  login Button */}

                  <Button>Politics</Button>
                  <Button>Finance</Button>
                  <Button>Business</Button>
                  <Button>Academia</Button>
                  <Button>Journalists</Button>
                  <Button>Non-profits</Button>
                </Nav>
              </div>
            </div>
          </Col>
          <Col xs={12}>
            <Container fluid>
              <Row>
                <Row>
                  <Col offset={2} xs={20}>
                    <Card
                      className={styles.panel}
                      header={
                        <div justifyContent='space-between'>
                          <span>FIrst post</span>
                        </div>
                      }
                    ></Card>
                  </Col>
                </Row>
                <br />
              </Row>
            </Container>
          </Col>
          <Col xs={6} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Link href={`/profile/${userData?.id}`} style={{ color: "inherit" }}>
              <Button color='blue' style={{ margin: "auto" }}>
                Profile
              </Button>
            </Link>
            <br />
            <br />
            <Button
              color='blue'
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
            <Button color='red' onClick={() => supabaseClient.auth.signOut()} style={{ margin: "auto" }}>
              Sign out
            </Button>
          </Col>
        </Row>
      </Container>
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
