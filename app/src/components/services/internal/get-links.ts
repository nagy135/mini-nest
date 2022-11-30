import { API_EP } from "@constants/common";
import { TLink } from "@ctypes/entities";

export default async (token?: string): Promise<TLink[]> => {
  return (await fetch(`${API_EP}/${token ? "token/" + token : "all"}`)).json();
};
