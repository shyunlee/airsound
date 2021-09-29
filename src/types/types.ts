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

export type EditUserRequestT = UserT & {
  currentPassword?: string;
  newPassowrd?: string;
} 

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
  customVolume?: number;
}

export type MoodT = {
  id?: number;
  title: string;
  video: VideoT;
  sounds: SoundT[];
  timer: number;
}

export type MoodListT = MoodT[]

type MoodSoundT = {
  id: number;
  moodId: number;
  soundId: number;
  customVolume: number;
}

type SoundsInMoodsT = SoundT & {
  mood_sounds?: MoodSoundT;
}

export type MoodResponseT = {
  id?: number;
  title: string;
  video: VideoT;
  timer: number;
  sounds: SoundsInMoodsT[]
}

export type MoodOnConsoleT = {
  id?: number;
  title: string;
  timer: number;
}

export type SaveOrEditMoodRequestT = {
  id?: number;
  title: string;
  timer: number;
  videoId?: number;
  sounds: {soundId:number, customVolume:number}[]
}

export type ResponseDataT = {
  message: string;
  data?: any;
}