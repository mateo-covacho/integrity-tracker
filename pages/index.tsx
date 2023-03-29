import Head from "next/head";
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
import "rsuite/dist/rsuite.min.css";
import { useUser } from '@auth0/nextjs-auth0/client';


const inter = Inter({ subsets: ["latin"] });

const Home = () => {
	const userData = useUser();
	console.log(userData.user)
  return (
    <Container style={{ height: "100vh" }}>
      <Head>
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
          crossOrigin='anonymous'
        />
      </Head>

      <Header>
        <Nav>
          <Nav.Item>Home</Nav.Item>
          <Nav.Item>About</Nav.Item>
          <Nav.Item>Blog</Nav.Item>
          <Nav.Item>Contact</Nav.Item>
        </Nav>
      </Header>
      <Container style={{ height: "100%" }}>
        <Sidebar style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Sidenav style={{ height: "100%" }}>
            <Sidenav.Body style={{ height: "100%" }}>
              <Nav>
                {/*  login Button */}
                <a href='/api/auth/login'>
                  <Button color='red' appearance='ghost'>
                    Red
                  </Button>
                </a>
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
        </Sidebar>
        <Content>
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
        </Content>
        <Sidebar style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Sidenav>
            <Sidenav.Header>Dashboard</Sidenav.Header>
            <Sidenav.Body>c</Sidenav.Body>
          </Sidenav>
        </Sidebar>
      </Container>
      <Footer>
        <p>© 2023 My Platform</p>
      </Footer>
    </Container>
  );
};

export default Home;
