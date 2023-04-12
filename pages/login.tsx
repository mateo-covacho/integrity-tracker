import { useRouter } from "next/router";
import Image from "next/image";
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
import { ThemeSupa, ThemeMinimal } from "@supabase/auth-ui-shared";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient, createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import "rsuite/dist/rsuite.min.css";
import { print } from "@/utils/print";

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
      <Container>
        <Row>
          <Col xsOffset={6} xs={12}>
            <Auth
              appearance={{ theme: ThemeMinimal }}
              redirectTo='http://localhost:3000/create_username'
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
      <h1>Logged in</h1>
    </>
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

  print("orange", `user id: ${user?.id}`);
  // Check if user has a table entry
  const has_table_entry = await fetch(`http://localhost:3000/api/users/usertable_exists?uuid=${user?.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.exists;
    });

  print("orange", `${user?.id} has table entry: ${has_table_entry}`);
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
        destination: "/ ",
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
