import { Container, Sidenav, Nav, Button, Header, Content, Footer, Row, Col, Panel, Placeholder, Tag } from "rsuite";
import Head from "next/document";
import "rsuite/dist/rsuite.min.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const supabaseClient = createBrowserSupabaseClient();

const UserProfile = (props) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState();

  // useEffect(() => {
  async function loadData() {
    // const { data } = await supabaseClient.from("public_figures").select("*");
    //console.log({ data });
    // setData(data);
  }

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
              <pre>{JSON.stringify(user, null, 2)}</pre>
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
export const getServerSideProps = async (ctx) => {
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


  const specificUUID = "cb131d30-8434-40c1-b894-4ea341d9d2a4";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_uuid = user.id;


  try {
    const user_data = await supabaseClient.from("users").select("id");

  } catch (e) {
    if (e.error.message) {
    
    }
  }

  return {
    props: {
      initialSession: session,
      user: user,
    },
  };
};
export default UserProfile;
