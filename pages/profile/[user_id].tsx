import { Container, Sidenav, Nav, Button, Header, Content, Footer, Row, Col, Panel, Placeholder, Tag } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { differenceInSeconds } from "date-fns";
import { id } from "date-fns/locale";
import Head from "next/document";
import Link from "next/link";
import { useRouter } from "next/router";
import { create_user } from "@/utils/create_user";
const supabaseClient = createBrowserSupabaseClient();

const UserProfile = (props: any) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const [data, setData] = useState();

  // console.log(props);

  // useEffect(() => {
  async function loadData() {
    // const { data } = await supabaseClient.from("public_figures").select("*");
    //console.log({ data });
    // setData(data);
  }

  function isoToUnixTime(isoString: string) {
    const unixTime = Date.parse(isoString) / 1000; // Convert to Unix time (in seconds)
    return unixTime;
  }

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  // console.log(props);
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
            {/* {			
 		 				!user : (return <Auth redirectTo='http://localhost:3000/' supabaseClient={supabaseClient} providers={["google", "github"]} socialLayout='horizontal' />)
			} */}
            <>
              <Button color='red' appearance='primary' onClick={() => supabaseClient.auth.signOut()}>
                Sign out
              </Button>

              <p>user:</p>
              <pre>{JSON.stringify(props.user, null, 2)}</pre>
              <p>client-side data fetching with RLS</p>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </>
          </Col>
          {/* <Col xs={6} style={{ height: "100%", display: "flex", flexDirection: "column" }}></Col> */}
        </Row>
      </Content>
      <Footer>
        <p>Copyright © 2023</p>
      </Footer>
    </Container>
  );
};

export const getServerSideProps = async (ctx: any) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
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

  const user_uuid = ctx.params.user_id;

  // console.log(user_uuid);

  const user_data = await supabaseClient.from("users").select("id").eq("id", user_uuid);
  // console.log(user_data);
  if (user_data.error === null) {
    //create user table
    // @ts-ignore
    // create_user(user_uuid);
  }

  return {
    props: {
      initialSession: session,
      user: user, // get_user() data
    },
  };
};
export default UserProfile;
