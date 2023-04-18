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

	let search_case;
  const { post_uuid, user_uuid, figure_uuid } = req.body;
	if (post_uuid !== null) {
		search_case = "post_uuid";
	} else if (user_uuid !== null) {
		search_case = "user_uuid";
	} else if (figure_uuid !== null) {
		search_case = "figure_uuid";
	} else {
		search_case = "no search case";
	}
	
  console.log("post_uuid", post_uuid);
  console.log("user_uuid", user_uuid);
  console.log("figure_uuid", figure_uuid);

	let data;
  print("yellow", "\t getting posts ...");
	switch (search_case) {
		case "post_uuid":
				data = await supabase.from("posts").select("*").eq("id", post_uuid);
				break;
			case "user_uuid":
				data = await supabase.from("posts").select("*").eq("user_id", user_uuid);
				break;
			case "figure_uuid":
				data = await supabase.from("posts").select("*").eq("public_figure_id", figure_uuid);
				break;	
		default:
			break;
	}
  console.log(data.data);
	const posts = data.data
  print("blue", "_________________________________________________________");

  res.status(200).json({ posts: posts });
}
