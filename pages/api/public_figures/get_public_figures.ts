// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { print } from "@/utils/print";
import { differenceInSeconds } from "date-fns";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  print("blue", "/api/posts/get_posts.ts \n");

  print("yellow", "\t creating client ...");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  print("green", "\t client created \n");

  const { q = "*" } = req.query;

  print("yellow", `\t searching public figures with ${q}  ...`);

  const { data, error } = await supabase
    .from("public_figures")
    .select()
    .order("name", { ascending: true })
    .or(`name.ilike.%${q}%,occupation.ilike.%${q}%`)
    .limit(10);

  if (error) print("red", error);

  print("blue", "_________________________________________________________");

  // console.log(data);

  // @ts-ignore
  res.status(200).json({ data });
}
