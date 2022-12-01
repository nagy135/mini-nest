export const randomString = (n: number): string =>
  (Math.random() + 1).toString(36).substring(n);
