// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { differenceInSeconds } from "date-fns";
import { table } from "console";

import { print } from "../../../utils/print";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  print("green", "Checking username ... ");

  print("orange", "\t\t creating client ...");
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
  print("green", "\t\t client created");

  const { username } = req.query;

  //	@ts-ignore

  print("orange", `\t checking username: ${username}`);
  const { data, error } = await supabase.from("users").select("username").eq("username", username);

  const username_valid = data?.length === 0 ? true : false;
  print("green", `\t username valid: ${username_valid}`);
  //	@ts-ignore
  res.status(200).json({ valid: username_valid });
}
