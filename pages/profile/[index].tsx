import { Container, Header, Content, Footer, Row, Col, Panel, Placeholder, Tag } from "rsuite";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";

const UserProfile = () => {
  const userData = useUser();
	console.log(userData);
 

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
      <Header>
        <h2>User Profile</h2>
      </Header>
      <Content>
        <Row gutter={16}>
          <Col md={8}>
            <Panel bordered>
              {/* <img src={userData.user.picture} alt='User avatar' />
              <h3>{userData.user.nickname}</h3>
              <p>{userData.user.email}</p> */}
            </Panel>
          </Col>
          <Col md={16}>
            <Panel bordered>
              <h3>Tags</h3>
              <Tag color='green'>New User</Tag>
              <Tag color='orange'>Pending Verification</Tag>
              <Tag color='red'>Incomplete Profile</Tag>
            </Panel>
          </Col>
        </Row>
      </Content>
      <Footer>
        <p>Copyright © 2023</p>
      </Footer>
    </Container>
  );
};

export default UserProfile;
