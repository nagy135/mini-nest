import { v4 as uuidv4 } from "uuid";

export const truncateWithEllipsis = (text: string, n: number): string =>
  text.length < n ? text : `${text.substring(0, n)}...`;

export const uuid = (): string => uuidv4();
