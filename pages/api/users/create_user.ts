// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { differenceInSeconds } from "date-fns";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(req.body);
  // const supabase = createServerSupabaseClient(ctx);
  // // Check if we have a session

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // //console.log(user);

  // const user_uuid = user!.id;

  // // console.log(user_uuid);

  // //create user table

  // const { data, error } = await supabase.from("users").insert({
  //   id: user_uuid,
  //   username: user?.user_metadata.name,
  //   email: user?.user_metadata.email,
  //   profile_pic: user?.user_metadata.avatar_url,
  //   bio: "bio",
  //   followers: null,
  //   following: null,
  //   posts: null,
  //   likes: null,
  //   dislikes: null,
  //   comments: null,
  //   tags: "new user",
  //   updated_at: user?.updated_at,
  //   created_at: user?.created_at,
  // });
  res.status(200).json({ name: "John Doe" });
}
