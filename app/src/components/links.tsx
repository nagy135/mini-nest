import { LINKS_QUERY_KEY } from "@constants/common";
import { TokenContext } from "@context/token";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import deleteLink from "./services/internal/delete-link";
import getLinks from "./services/internal/get-links";
import Cat from "@assets/cat";

type ListType = "all" | "mine";

export default () => {
  const { token } = useContext(TokenContext);

  // NOTE: this is needed because state isnt updating inside useQuery
  // queryFn handler
  const tokenRef = useRef(token);
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);
  const queryClient = useQueryClient();

  const listTypeRef = useRef<ListType>("all");
  const [listType, setListType] = useState<ListType>("all");

  const [clicked, setClicked] = useState<Record<string, boolean>>({});
  const { data: links, isSuccess } = useQuery({
    queryKey: [LINKS_QUERY_KEY],
    queryFn: async () => {
      const tokenUse =
        listTypeRef.current === "mine" && tokenRef.current
          ? tokenRef.current
          : undefined;
      const data = await getLinks(tokenUse);
      if (!Object.keys(clicked).length) {
        setClicked(Object.fromEntries(data.map((e) => [e.id, false])));
      } else {
        setClicked((prev) => {
          return {
            ...Object.fromEntries(data.map((e) => [e.id, false])),
            ...prev,
          };
        });
      }
      return data;
    },
  });

  const handleDelete = (id: string, token: string) => {
    deleteLink(id, token).then(() =>
      queryClient.invalidateQueries([LINKS_QUERY_KEY])
    );
  };

  const handleRadioSwitch = (change: ListType) => {
    listTypeRef.current = change;
    setListType(change);
    queryClient.invalidateQueries([LINKS_QUERY_KEY]);
  };

  const handleClick = useCallback((id: string) => {
    setClicked((prev) => ({ ...prev, [id]: !prev[id] ?? false }));
  }, []);

  if (!isSuccess) return null;

  return (
    <div className="container max-w-sm mx-auto flex flex-col gap-2">
      <div className="flex justify-between border-2 p-2 rounded-md border-gray-300">
        <button
          className={`btn ${listType === "mine" ? "btn-warning" : ""}`}
          onClick={() => handleRadioSwitch("mine")}
          disabled={token === null}
        >
          Mine
        </button>
        <div className={`flex mx-4 flex-1 ${

            listTypeRef.current === "all" ? "justify-end" : "justify-start"
}`}>
          <Cat />
        </div>
        <button
          className={`btn ${
            listTypeRef.current === "all" ? "btn-warning" : ""
          }`}
          onClick={() => handleRadioSwitch("all")}
        >
          All
        </button>
      </div>
      {links.map((e) => (
        <div className="flex flex-col">
          <div
            className="flex gap-1 justify-between"
            key={`link-wrapper-${e.id}`}
          >
            <a className="btn flex-1" href={e.url}>
              {e.name}
            </a>
            {token && e.token === token ? (
              <button
                onClick={() => handleDelete(e.id, token)}
                className="btn btn-error"
              >
                {"❌"}
              </button>
            ) : null}
            <button
              onClick={() => handleClick(e.id)}
              className="btn btn-warning"
            >
              {clicked[e.id] ? "| Name |" : "Target"}
            </button>
          </div>
          {clicked[e.id] ? (
            <div className="my-1 text-sm font-mono">{e.url}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
