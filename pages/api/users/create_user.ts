// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { print } from "@/utils/print";
import { differenceInSeconds } from "date-fns";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  print("green", "Creating user ... ");

  print("yellow", "\t creating client ...");
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
  print("green", "\t client created \n");

  const { user_uuid, username, email, profile_pic, bio, tags, joined } = req.query;

  //create user table

  print("yellow", "\t creating user ...");
  //const { data, error } = await supabase.from("users").insert({
  const response = await supabase.from("users").insert({
    id: user_uuid,
    username: username,
    email: email,
    profile_pic: profile_pic,
    bio: bio,
    tags: tags,
    joined: joined,
  });
  print("green", response);

  res.status(200).json({ name: "John Doe" });
}
