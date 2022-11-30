import { LOCALSTORAGE_TOKEN_KEY } from "@constants/common";
import { useQuery } from "@tanstack/react-query";
import { truncateWithEllipsis } from "@utils/common";
import { useCallback, useState } from "react";
import getLinks from "./services/internal/get-links";

export default () => {
  const [clicked, setClicked] = useState<Record<string, boolean>>({});
  const { data: links, isSuccess } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const data = await getLinks(
        localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) ?? undefined
      );
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

  if (!isSuccess) return <div>...loading</div>;

  return (
    <div className="container max-w-sm mx-auto flex flex-col gap-2">
      {links.map((e) => (
        <div
          className="flex gap-1 justify-between"
          key={`link-wrapper-${e.id}`}
        >
          <a className="btn flex-1" href={e.url}>
            {clicked[e.id] ? truncateWithEllipsis(e.url, 20) : e.name}
          </a>
          <button onClick={() => handleClick(e.id)} className="btn btn-warning">
            {clicked[e.id] ? 'Name' : 'Target'}
          </button>
        </div>
      ))}
    </div>
  );
};
