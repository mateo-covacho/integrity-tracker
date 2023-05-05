import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";

import { createBrowserSupabaseClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { Button, Panel, ButtonGroup, Tag, Callout, Navbar, NavbarGroup, NavbarHeading, NavbarDivider } from "@blueprintjs/core";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";

import styles from "@/styles/Home.module.css";
// import "../styles/outline.css"

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
    <>
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>Blueprint</NavbarHeading>
          <NavbarDivider />
          <Button
            color='blue'
            style={{ margin: "auto" }}
            onClick={async () => {
              const posts = await fetch(`${process.env.ROOT_LINK}/api/posts/get_posts`, {
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
          </Button>
          <Link href={`/profile/${userData?.id}`} style={{ color: "inherit" }}>
            <Button color='blue' style={{ margin: "auto" }}>
              Profile
            </Button>
          </Link>
          <Button color='red' onClick={() => supabaseClient.auth.signOut()} style={{ margin: "auto" }} intent='danger'>
            Sign out
          </Button>
        </NavbarGroup>
      </Navbar>
      <Container style={{ height: "100vh" }}>
        <Row>
          <Col xs={3} className='text-end outline_right'>
            <h4>Categories</h4>
            <br />
            <Button alignText='right' fill='true'>
              Politics
            </Button>
            <br />
            <Button alignText='right' fill='true'>
              Finance
            </Button>
            <br />
            <Button alignText='right' fill='true'>
              Business
            </Button>
            <br />
            <Button alignText='right' fill='true'>
              Academia
            </Button>
            <br />
            <Button alignText='right' fill='true'>
              Journalists
            </Button>
            <br />
            <Button alignText='right' fill='true'>
              Non-profits
            </Button>
          </Col>
          <Col xs={6}>
            <Row>
              <Col xs={12}>
                <Card
                  className={styles.panel}
                  header={
                    <div justifyContent='space-between'>
                      <span>First post</span>
                    </div>
                  }
                ></Card>
              </Col>
            </Row>
            <Row>
              <Col xs={12}></Col>
            </Row>
          </Col>
          <Col xs={3} className='outline_left'>
            <div id='hot-network-questions' class='module tex2jax_ignore'>
              <h4>Hot Network Questions</h4>
              <ul>
                <Callout title={"Public Figure's Climate Change Initiative Delivers Results"} intent={"success"}>
                  A recent analysis reveals that the climate change initiative launched by the public figure has successfully reduced carbon emissions
                  by 15% in the past year.
                </Callout>
                <br />

                <Callout title={"Celebrity's Charity Found to Have Mismanaged Funds"} intent={"warning"}>
                  An investigation uncovers that the charity organization endorsed by the celebrity has been mismanaging funds, with only a small
                  percentage reaching the intended recipients.
                </Callout>
                <br />

                <Callout title={"Politician's Education Reform Plan Shows Promising Results"} intent={"success"}>
                  Data from the latest national assessment shows significant improvement in students academic performance following the implementation
                  of the politicians education reform plan.
                </Callout>
                <br />

                <Callout title={"Misinformation about Vaccination Circulated by Public Figure"} intent={"danger"}>
                  A public figure spreads false claims about the safety and effectiveness of a widely-used vaccine, potentially undermining public
                  trust in vaccination programs.
                </Callout>
                <br />

                <Callout title={"Tech Entrepreneur's Renewable Energy Project Gains Momentum"} intent={"success"}>
                  The renewable energy project led by the tech entrepreneur has secured substantial funding, paving the way for cleaner and more
                  sustainable energy production in the region.
                </Callout>
                <br />
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </>
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
