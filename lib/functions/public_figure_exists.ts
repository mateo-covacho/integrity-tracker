import { UUID } from "crypto";
import { url } from "../../utils/url";
import urljoin from "url-join";

export async function public_figure_UUID_exists(uuid: any): Promise<boolean> {
  const response = await get_public_figures(uuid);
  return response.length === 1;
}

export async function get_public_figures(q: string): Promise<PublicFigure[]> {
  let ress = await fetch(
    urljoin(url, `/api/public_figures/get_public_figures?q=${q}`)
  ).then((res) => res.json());

  return ress.data;
}
