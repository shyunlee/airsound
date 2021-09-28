import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Console from "../../components/console/Console";
import MoodList from "../../components/list_mood/MoodList";
import ScreenList from "../../components/list_screen/ScreenList";
import SoundList from "../../components/list_sound/SoundList";
import styles from "./player.module.css";
import {
  MoodT,
  SoundT,
  UserT,
  VideoT,
  MoodOnConsoleT,
} from "../../types/types";
import MediaService from "../../service/media";

type PlayerProps = {
  isLogin: Boolean;
  userInfo: UserT | undefined;
  onLogout: () => void;
  mediaService: MediaService;
};

const Player = ({
  isLogin,
  userInfo,
  onLogout,
  mediaService,
}: PlayerProps): JSX.Element => {
  const [sounds, setSounds] = useState<SoundT[]>([]);
  const [videos, setVideos] = useState<VideoT[]>([]);
  const [moods, setMoods] = useState<MoodT[]>([]);
  const [consoleVideo, setConsoleVideo] = useState<VideoT>();
  const [consoleSounds, setConsoleSounds] = useState<SoundT[]>([]);
  const [consoleMoodInfo, setConsoleMoodInfo] = useState<MoodOnConsoleT>({title: "", timer: 5600});

  useEffect(() => {
    mediaService.getAllMedia().then((result) => {
      setSounds(result.sounds);
      setVideos(result.videos);
      setMoods(result.moods);
    });
  }, [mediaService]);

  const onSound = (selectedSound: SoundT) => {
    setConsoleSounds(prev => prev.concat(selectedSound))
  };

  const offSound = (soundId: number) => {
    setConsoleSounds(prev => prev.filter(sound => sound.id !== soundId))
  };

  const onVideo = (selectedVideo: VideoT) => {
    setConsoleVideo(selectedVideo)
  };

  const offVideo = () => {
    setConsoleVideo(undefined)
  };

  const onMood = (selectedMood: MoodT) => {
    setConsoleVideo(selectedMood.video)
    setConsoleSounds(selectedMood.sounds)
    setConsoleMoodInfo({id: selectedMood.id, title: selectedMood.title, timer: selectedMood.timer})
  };

  const offMood = () => {
    setConsoleVideo(undefined)
    setConsoleSounds([])
    setConsoleMoodInfo({title: '', timer: 5600})
  };

  const controlVolume = (soundId: number, isVolumeUp: boolean) => {};

  const toggleMute = () => {};

  const saveMood = async (
    consoleMoodInfo: MoodOnConsoleT,
    consoleVideo: VideoT,
    consoleSounds: SoundT[]
  ) => {
    const requestData = {
      title: consoleMoodInfo.title,
      timer: consoleMoodInfo.timer,
      videoId: consoleVideo?.id,
      sounds: consoleSounds.map((sound) => ({
        soundId: sound.id!,
        customVolume: sound.customVolume!,
      })),
    };
    const response = await mediaService.saveMood(requestData);
    if (response.message === 'ok') {
      const moodAdded = {
        id: response.data! as number,
        title: consoleMoodInfo.title,
        timer: consoleMoodInfo.timer,
        video: consoleVideo,
        sounds: consoleSounds
      }
      setMoods(prev => prev.concat(moodAdded))
      return true
    }
    return false
  };

  const editMood = (moodId: number) => {};

  const deleteMood = async (moodId: number) => {
    const response = await mediaService.deleteMood(moodId);
    if (response.message === 'ok') {
      setMoods(prev => prev.filter(mood => mood.id !== moodId))
    }
  };

  return (
    <div className={styles.player}>
      <Header isLogin={isLogin} userInfo={userInfo} onLogout={onLogout} />
      <main className={styles.main}>
        <section className={styles.main_left}>
          <MoodList moodsList={moods} onDelete={deleteMood}  selectMood={onMood}/>
        </section>
        <section className={styles.main_center}>
          <section className={styles.center}>
            <section className={styles.center_top}>
                <Console
                  onSave={saveMood}
                  onDelete={deleteMood}
                  selectedVideo={consoleVideo}
                  selectedSoundsList={consoleSounds}
                  selectedMoodInfo={consoleMoodInfo}
                  unSelectMood={offMood}
                  unSelectVideo={offVideo}
                  unSelectSound={offSound}
                />
            </section>
            <section className={styles.center_bottom}>
              <ScreenList videosList={videos} selectVideo={onVideo} unSelectVideo={offVideo} consoleVideo={consoleVideo?consoleVideo:undefined}/>
            </section>
          </section>
        </section>
        <section className={styles.main_right}>
          <SoundList soundsList={sounds} selectSound={onSound} unSelectSound={offSound} consoleSounds={consoleSounds}/>
        </section>
      </main>
    </div>
  );
};

export default Player;
