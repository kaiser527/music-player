export const convertUrl = (url: string) => {
  const selectedUrl = url.replace("localhost:3000", "10.0.2.2:3000");

  return selectedUrl;
};
