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

export const sortTrack = (track: ITrack[], trackQueue: Track[]) => {
  const queueUrls = trackQueue.map((t) => t.url);

  return track.slice().sort((a, b) => {
    const indexA = queueUrls.indexOf(convertUrl(a.url));
    const indexB = queueUrls.indexOf(convertUrl(b.url));

    // If a track is not in queue, push it to the end
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
};
