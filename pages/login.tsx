import { useRouter } from "next/router";
import Image from "next/image";
import { Container, Col, Row } from "react-bootstrap";
import { Card } from "@blueprintjs/core";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ThemeMinimal } from "@supabase/auth-ui-shared";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import {
  createBrowserSupabaseClient,
  createServerSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import "rsuite/dist/rsuite.min.css";
import { print } from "@/utils/print";
// import urljoin from 'url-join';
import { url } from "../utils/url";
import urljoin from "url-join";

function SignIn() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState();
  const router = useRouter();

  // useEffect(() => {
  //   async function loadData() {
  //     const { data } = await supabaseClient.from("public_figures").select("*");
  //     console.log({ data });
  //     setData(data);
  //   }
  //   // Only run query once user is logged in.
  //   if (user) loadData();
  // }, [user]);

  if (user) {
    router.push("/create_username");
  }

  // useEffect(() => {}, [user, router]);

  const handleAuth = async () => {};
  if (!user)
    return (
      <Container fluid style={{ height: "100vh" }} className="body">
        <Row className=" ">
          <Col
            xs={10}
            md={6}
            xl={4}
            className="justify-content-center mx-auto  my-5"
          >
            <Card>
              <img
                src="/resources/logo1.png"
                alt="logo"
                style={{ width: "100%" }}
              />
              <Auth
                appearance={{ theme: ThemeSupa }}
                redirectTo={`https://mateo-covacho-musical-carnival-gwj6rrjww6p2wv76-3000.preview.app.github.dev/create_username`}
                supabaseClient={supabaseClient}
                providers={["google"]}
                socialLayout="horizontal"
              />
            </Card>
          </Col>
        </Row>
      </Container>
    );

  return (
    <div style={{ height: "100vh" }}>
      <h1>Logged in</h1>
    </div>
  );
}

export const getServerSideProps = async (ctx: object) => {
  print("blue", "/login:getServerSideProps");
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx as any);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let has_table_entry = false;
  if (user) {
    print("orange", `user id: ${user?.id}`);
    // Check if user has a table entry
    // @ts-ignore
    print("red", url);

    const endpointPath = `/api/users/usertable_exists?uuid=${user?.id}`;
    const apiUrl = urljoin(url, endpointPath);
    has_table_entry = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // @ts-ignore
        return res.exists;
      });
    print("orange", `${user?.id} has table entry: ${has_table_entry}`);
  }

  // console.log(session);
  print("blue", "_________________________________________________________");

  if (session && !has_table_entry) {
    return {
      redirect: {
        destination: "/create_username",
        permanent: false,
      },
    };
  } else if (has_table_entry && session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: "session?.user?,",
    },
  };
};

export default SignIn;
