// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { print } from "@/utils/print";
import { differenceInSeconds } from "date-fns";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { title } from "process";

type Data = {
  name: string;
};

console.log(uuidv4());

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  print("blue", "/api/users/create_post.ts");

  print("yellow", "\t creating client ...");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  print("green", "\t client created \n");

  const {
    user_uuid,
    public_figure_UUID,
    content,
    username,
    email,
    profile_pic,
    category,
    bio,
    tags,
    joined,
    evidence_links,
  } = req.body;

  print(
    "yellow",
    `\t ${user_uuid},${public_figure_UUID},${content},${username},${email},${profile_pic},${category},${bio},${tags},${joined},${evidence_links}`
  );
  //create user table

  print("yellow", "\t creating user ...");

  const response = await supabase.from("users").insert({
    id: uuidv4(),
    user_id: user_uuid,
    public_figure_id: public_figure_UUID,
    title: title,
    content: content,
    evidence_links: evidence_links,
    truth_score: 0,
    created_at: Date.now(),
    updated_at: Date.now(),
    category: category,
  });
  print("green", response);

  print("blue", "_________________________________________________________");

  res.status(200).json(response as any);
}
