import { LINKS_QUERY_KEY } from "@constants/common";
import { TokenContext } from "@context/token";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { truncateWithEllipsis } from "@utils/common";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import deleteLink from "./services/internal/delete-link";
import getLinks from "./services/internal/get-links";

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
    queryClient.invalidateQueries([LINKS_QUERY_KEY]);
  };

  const handleClick = useCallback((id: string) => {
    setClicked((prev) => ({ ...prev, [id]: !prev[id] ?? false }));
  }, []);

  if (!isSuccess) return null;

  return (
    <div className="container max-w-sm mx-auto flex flex-col gap-2">
      <div className="">
        <div className="form-control">
          <label className="label cursor-pointer w-1/2 mx-auto">
            <span className="label-text">My links</span>
            <input
              type="radio"
              name="mine"
              className="radio checked:bg-red-500"
              checked={listTypeRef.current === "mine"}
              onChange={() => handleRadioSwitch("mine")}
              disabled={token === null}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer w-1/2 mx-auto">
            <span className="label-text">All</span>
            <input
              type="radio"
              name="all"
              onChange={() => handleRadioSwitch("all")}
              className="radio checked:bg-blue-500"
              checked={listTypeRef.current === "all"}
            />
          </label>
        </div>
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
          {clicked[e.id] ? <div className="my-1 text-sm font-mono">{e.url}</div> : null}
        </div>
      ))}
    </div>
  );
};
