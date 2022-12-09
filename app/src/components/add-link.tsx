import { LINKS_QUERY_KEY, LOCALSTORAGE_TOKEN_KEY } from "@constants/common";
import { TokenContext } from "@context/token";
import { useQueryClient } from "@tanstack/react-query";
import { uuid } from "@utils/common";
import { useCallback, useContext, useState } from "react";
import createLink from "./services/internal/create-link";

export default () => {
  const queryClient = useQueryClient();
  const { token, setToken } = useContext(TokenContext);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const createLinkHandler = useCallback(async() => {
    if (!token) {
      const newToken = uuid();
      localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, newToken);
      setToken(newToken);
      await createLink(name, url, newToken);
    } else {
      await createLink(name, url, token);
    }

    queryClient.invalidateQueries([LINKS_QUERY_KEY]);
  }, [token, name, url]);

  return (
    <div className="container max-w-sm mx-auto my-2">
      <div className="collapse">
        <input type="checkbox" />
        <div className="collapse-title btn btn-info">Add new link</div>
        <div className="collapse-content">
          <div className="flex flex-col p-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              className="input input-bordered w-full"
            />
            <textarea
              className="textarea textarea-bordered w-full"
              value={url}
              placeholder="url"
              onChange={(e) => setUrl(e.target.value)}
            ></textarea>
            <button onClick={createLinkHandler} className="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
