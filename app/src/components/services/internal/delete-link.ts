import { API_EP } from "@constants/common";

export default async (id: string, token: string): Promise<void> => {
  await fetch(`${API_EP}/link/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ token }),
  });
};
