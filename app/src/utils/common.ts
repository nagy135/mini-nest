export const truncateWithEllipsis = (text: string, n: number): string =>
  text.length < n ? text : `${text.substring(0, n)}...`;
