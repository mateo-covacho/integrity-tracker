// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { print } from "@/utils/print";
import { differenceInSeconds } from "date-fns";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  print("blue", "/api/posts/get_posts.ts");

  print("yellow", "\t creating client ...");
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
  print("green", "\t client created \n");

  const { post_uuid, author_uuid, figure_uuid } = req.body;

  console.log(req);
  console.log("post_uuid", post_uuid);
  console.log("author_uuid", author_uuid);
  console.log("figure_uuid", figure_uuid);

  //create user table

  print("yellow", "\t getting posts ...");
  // const { data: posts, error: postsError } = await supabase.from("posts").select("*").order("created_at", { ascending: false });

  print("blue", "_________________________________________________________");

  res.status(200).json({ name: "fsdfsdf" });
}
