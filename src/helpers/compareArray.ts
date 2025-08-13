import { Track } from "react-native-track-player";

export const compareArray = (arr1: Track[], arr2: Track[]) => {
  if (arr1.length !== arr2.length) return false;

  const normalize = (track: Track) => ({
    title: track.title || "",
    artist: track.artist || "",
    url: track.url || "",
    artwork: track.artwork || "",
  });

  const norm1 = arr1.map(normalize);
  const norm2 = arr2.map(normalize);

  return norm1.every((t1) =>
    norm2.some(
      (t2) =>
        t1.title === t2.title && t1.artist === t2.artist && t1.url === t2.url
    )
  );
};
