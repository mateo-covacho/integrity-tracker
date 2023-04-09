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
  print("blue", "/api/users/usertable_exists.ts");
  print("yellow", "\t Checking usertable ... ");

  print("yellow", "\t\t creating client ...");
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
  print("green", "\t\t client created");

  const { uuid } = req.query;
  //	@ts-ignore
  print("yellow", `\t\t checking uuid: ${uuid} for user table ...`);
  const { data, error } = await supabase.from("users").select("id").eq("id", uuid);

  let table_exists = false;
  //	@ts-ignore
  if (error) {
    print("red", "\t" + error);
  } else if (data.length === 0) {
    table_exists = false;
  } else {
    table_exists = true;
  }
  print("green", `\t Has table: ${table_exists}`);

  print("blue", "_________________________________________________________");

  res.status(200).json({ exists: table_exists });
}
