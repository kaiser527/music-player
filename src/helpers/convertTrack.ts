import { ITrack } from "@/types/backend";
import { Track } from "react-native-track-player";

export const convertUrl = (url: string) => {
  const selectedUrl = url.replace("localhost:3000", "10.0.2.2:3000");

  return selectedUrl;
};

export const convertTrack = (tracks: ITrack[]) => {
  const convertedTracks: Track[] = tracks.map((track) => ({
    url: convertUrl(track.url),
    title: track.title,
    artist: track.user.username,
    artwork: track.artwork,
  }));

  return convertedTracks;
};
