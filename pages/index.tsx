import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/Home.module.css";
import { Button, Panel, ButtonGroup, Tag, Callout, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment } from "@blueprintjs/core";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import { Inter } from "next/font/google";

import { createBrowserSupabaseClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";

import urljoin from "url-join";
import { url } from "@/utils/url";
import { print } from "@/utils/print";

import Sidemenu from "@/lib/Sidemenu";
import Post from "@/lib/Post";
import Navbarcustom from "@/lib/Navbarcustom";
// import "../styles/outline.css"

const inter = Inter({ subsets: ["latin"] });
const supabaseClient = createBrowserSupabaseClient();

export function sign_out() {
  supabaseClient.auth.signOut();
}

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
  // ver si por que no funciona el create username y se piensa que todos tienen????

  return (
    <>
      <Navbarcustom userData={userData} signout_function={sign_out} />
      <Container>
        <Row>
          <Sidemenu md={3} xs={5} />
          <Col md={6} xs={7}>
            <Col xs={12}>
              {props.latest_posts.map((post: any) => (
                <Post key={post.created_at} post={post} />
              ))}
            </Col>

            <Row>
              <Col xs={12}></Col>
            </Row>
          </Col>
          <Col md={3} className='outline_left d-none d-sm-block'>
            <div id='hot-network-questions' className='module tex2jax_ignore'>
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

  const { data: latest_posts } = await supabaseClient.from("posts").select("*").order("created_at", { ascending: false }).limit(10); // Adjust the limit to the desired number of posts

  // print("red", latest_posts);

  return {
    props: {
      initialSession: session,
      latest_posts,
      UserData: getUserData.data.user,
    },
  };
};

export default Home;
