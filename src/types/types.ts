export type VideoT = {
  id?: number;
  title: string;
  srcImage: string;
  srcVideo?: string;
}

export type SoundT = {
  id?: number;
  title: string;
  srcImage: string;
  defaultVolume?: number;
}

export type MoodT = {
  id?: number;
  title: string;
  video: VideoT;
  sounds: SoundT[];
}