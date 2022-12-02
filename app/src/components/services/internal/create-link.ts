import { API_EP } from "@constants/common";
import { TLink } from "@ctypes/entities";

export default async (
  name: string,
  url: string,
  token: string
): Promise<TLink> => {
  return (
    await fetch(`${API_EP}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        url,
        token,
      }),
    })
  ).json();
};
