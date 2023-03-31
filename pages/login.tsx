import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/document";
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
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import "rsuite/dist/rsuite.min.css";

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
    router.push("/");
  }
  // useEffect(() => {}, [user, router]);

  const handleAuth = async () => {};
  if (!user)
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <Auth
              appearance={{ theme: ThemeSupa }}
              redirectTo='http://localhost:3000/'
              supabaseClient={supabaseClient}
              providers={["google"]}
              socialLayout='horizontal'
            />
          </Col>
        </Row>
      </Container>
    );

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // console.log(session);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: "session?",
      user: "session?.user?,",
    },
  };
};

export default SignIn;
