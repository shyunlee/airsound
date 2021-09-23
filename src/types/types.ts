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
  srcSound: string;
  volume?: number;
}

export type MoodT = {
  id?: number;
  title: string;
  video: VideoT;
  sounds: SoundT[];
  timer: number;
}

export type UserT = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  srcImage?: string | undefined;
}

export type UserSignupT = UserT & {
  username: string;
  email: string;
  password: string;
}

export type UserLoginT = {
  email: string;
  password: string;
}

export type UserReponseT = {
  message: string;
  data?: UserT
}