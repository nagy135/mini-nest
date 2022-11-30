import { LOCALSTORAGE_TOKEN_KEY } from "@constants/common";
import { createContext, ReactNode, useState } from "react";

export type TTokenContext = {
  token: string | null;
  setToken: (val: string) => void;
};
export const tokenContextDefault: TTokenContext = {
  token: null,
  setToken: (_token: string): void => {},
};

export const TokenContext = createContext<TTokenContext>(tokenContextDefault);

interface IProps {
  children: ReactNode;
}

export default ({ children }: IProps) => {
  const [token, setToken] = useState<TTokenContext["token"]>(
    localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
  );

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
