import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { print } from "../../../utils/print";

type Data = {
  exists?: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  print("blue", "/api/users/usertable_exists.ts");
  print("yellow", "\t Checking usertable ... ");
  // @ts-ignore
  const {
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }: {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  } = process.env;
  print("yellow", "\t\t creating client ...");
  const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  print("green", "\t\t client created");

  const { uuid } = req.query;
  print("yellow", `\t\t checking uuid: ${uuid} for user table ...`);
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("id", uuid);

  let tableExists = false;
  if (error) {
    print("red", "\t" + error);
    return res
      .status(500)
      .json({ error: "An error occurred while checking the user table." });
  } else if (data.length === 0) {
    tableExists = false;
  } else {
    tableExists = true;
  }
  print("green", `\t Has table: ${tableExists}`);

  print("blue", "_________________________________________________________");
  res.status(200).json({ exists: tableExists });
}
