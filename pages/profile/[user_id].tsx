import { Container, Sidenav, Nav, Button, Header, Content, Footer, Row, Col, Panel, Placeholder, Tag } from "rsuite";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";
import "rsuite/dist/rsuite.min.css";

const UserProfile = () => {
  const userData = useUser();
  console.log(userData);
  // console.log(userData.user?.email);
  // console.log(userData.user);
  // console.log(userData.user);

  return (
    <Container>
      <Head>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
          crossOrigin='anonymous'
        />
      </Head>
      <Head>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
          crossOrigin='anonymous'
        />
      </Head>
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
                  <a href='/' style={{ color: "inherit" }}>
                    <Button color='green' appearance='ghost' style={{ margin: "auto" }}>
                      home
                    </Button>
                  </a>
                  <br />
                  <br />
                  {/* login/logout button  */}
                  {userData.user ? (
                    <a href='/api/auth/logout' style={{ color: "inherit" }}>
                      <Button color='red' appearance='ghost' style={{ margin: "auto" }}>
                        logout
                      </Button>
                    </a>
                  ) : (
                    <Button color='red' appearance='ghost' style={{ margin: "auto" }}>
                      <a href='/api/auth/login' style={{ color: "inherit" }}>
                        login
                      </a>
                    </Button>
                  )}
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
          <Col xs={15}></Col>
          {/* <Col xs={6} style={{ height: "100%", display: "flex", flexDirection: "column" }}></Col> */}
        </Row>
      </Content>
      <Footer>
        <p>Copyright © 2023</p>
      </Footer>
    </Container>
  );
};

export default UserProfile;
