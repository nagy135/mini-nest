import { TokenContext } from "@context/token";
import { useQuery } from "@tanstack/react-query";
import { truncateWithEllipsis } from "@utils/common";
import { useCallback, useContext, useState } from "react";
import getLinks from "./services/internal/get-links";

export default () => {
  const { token } = useContext(TokenContext);

  const [clicked, setClicked] = useState<Record<string, boolean>>({});
  const { data: links, isSuccess } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const data = await getLinks(token ?? undefined);
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
              name="radio-10"
              className="radio checked:bg-red-500"
              checked
              disabled={token === null}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer w-1/2 mx-auto">
            <span className="label-text">All</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              checked
            />
          </label>
        </div>
      </div>
      {links.map((e) => (
        <div
          className="flex gap-1 justify-between"
          key={`link-wrapper-${e.id}`}
        >
          <a className="btn flex-1" href={e.url}>
            {clicked[e.id] ? truncateWithEllipsis(e.url, 20) : e.name}
          </a>
          <button onClick={() => handleClick(e.id)} className="btn btn-warning">
            {clicked[e.id] ? "Name" : "Target"}
          </button>
        </div>
      ))}
    </div>
  );
};
