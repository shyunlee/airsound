import React, { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Header from "../../components/header/Header";
import Console from "../../components/console/Console";
import MoodList from "../../components/list_mood/MoodList";
import ScreenList from "../../components/list_screen/ScreenList";
import SoundList from "../../components/list_sound/SoundList";
import MyProfile from '../../components/myprofile/MyProfile';
import styles from "./player.module.css";
import {
  MoodT,
  SoundT,
  UserT,
  VideoT,
  MoodOnConsoleT,
  EditUserRequestT,
} from "../../types/types";
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import MediaService from "../../service/media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PlayerProps = {
  isLogin: Boolean;
  userInfo: UserT | undefined;
  onLogout: () => void;
  mediaService: MediaService;
  onEditUserInfo: (edit:EditUserRequestT) => Promise<Boolean>;
  FileInput: (props: any) => JSX.Element;
};

const Player = ({
  isLogin,
  userInfo,
  onLogout,
  mediaService,
  onEditUserInfo,
  FileInput,
}: PlayerProps): JSX.Element => {
  const [sounds, setSounds] = useState<SoundT[]>([]);
  const [videos, setVideos] = useState<VideoT[]>([]);
  const [moods, setMoods] = useState<MoodT[]>([]);
  const [consoleVideo, setConsoleVideo] = useState<VideoT>();
  const [consoleSounds, setConsoleSounds] = useState<SoundT[]>([]);
  const [consoleMoodInfo, setConsoleMoodInfo] = useState<MoodOnConsoleT>({title:'', timer: 3});
  const [isProfileOn, setIsProfileOn] = useState(false)
  const [isSettingOn, setIsSettingOn] = useState(false)
  const [videoDegree, setVideoDegree] = useState(0)
  const [soundDegree, setSoundDegree] = useState(0)
  const [isScreenDisplayOn, setIsScreenDisplayOn] = useState(true)
  const [isSoundDisplayOn, setIsSoundDisplayOn] = useState(true)
  const [isScreenLocked, setIsScreenLocked] = useState(true)
  const [isSoundLocked, setIsSoundLocked] = useState(true)

  const handle = useFullScreenHandle();

  useEffect(() => {
    mediaService.getAllMedia().then((result) => {
      setSounds(result.sounds);
      setVideos(result.videos);
      setMoods(result.moods);
    });
  }, [mediaService, isLogin]);

  useEffect(() => {
    document.body.classList.add('fixed-scroll')
    return () => {
      document.body.classList.remove('fixed-scroll')
    }
  }, [])

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
    setConsoleMoodInfo(prev => ({
      ...prev,
      id: selectedMood.id, title: selectedMood.title, timer: selectedMood.timer
    }))
  };

  const onMoodReset = (moodId?: number) => {
    const currentMood = moods.filter(item => item.id === moodId )[0]
    console.log(currentMood)
    onMood(currentMood)
  }

  const offMood = () => {
    setConsoleVideo(undefined)
    setConsoleSounds([])
    setConsoleMoodInfo({title:'', timer: 3})
  };

  const controlVolume = (customVolume: number, soundId?: number) => {
    const volumeChanged = consoleSounds.map(item => {
      if (item.id === soundId) {
        return {
          ...item,
          customVolume
        }
      }
      return item
    })
    setConsoleSounds(volumeChanged)
  };

  const saveOrEditMood = async (
    consoleMoodInfo: MoodOnConsoleT,
    consoleVideo: VideoT,
    consoleSounds: SoundT[]
  ) => {
    const requestData = {
      id: consoleMoodInfo.id,
      title: consoleMoodInfo.title,
      timer: consoleMoodInfo.timer,
      videoId: consoleVideo?.id,
      sounds: consoleSounds.map((sound) => ({
        soundId: sound.id!,
        customVolume: sound.customVolume!,
      })),
    };
    let response;
    if (requestData.id) {
      response = await mediaService.editMood(requestData)
    } else {
      response = await mediaService.saveMood(requestData);
    }
    const newMood = {
      id: response.data! as number,
      title: consoleMoodInfo.title,
      timer: consoleMoodInfo.timer,
      video: consoleVideo,
      sounds: consoleSounds
    }
    if (response.message === 'saved') {
      setMoods(prev => prev.concat(newMood))
      return true
    }
    if (response.message === 'updated') {
      setMoods(prev => {
        return prev.map(mood => {
          if (mood.id === newMood.id) {
            return newMood
          }
          else return mood
        })
      })
      return true
    }
    return false
  };

  const deleteMood = async (moodId: number) => {
    const response = await mediaService.deleteMood(moodId);
    if (response.message === 'ok') {
      setMoods(prev => prev.filter(mood => mood.id !== moodId))
    }
  };

  const getFullScreen = () => {
    handle.enter()
  }

  const closeModal = () => {
    setIsProfileOn(false)
    setIsSettingOn(false)
  }

  const toggleProfileModal = () => {
    setIsProfileOn(!isProfileOn)
  }

  const toggleSettingModal = () => {
    setIsSettingOn(!isSettingOn)
  }

  const ScreenWheelEvent = (event: any) => {
    const factor = event.nativeEvent
    if (factor.wheelDelta >= 0) {
      setVideoDegree(prev => prev - 1)
    }
    else {
      setVideoDegree(prev => prev + 1)
    }
  }

  const soundWheelEvent = (event: any) => {
    const factor = event.nativeEvent
    if (factor.wheelDelta >= 0) {
      setSoundDegree(prev => prev + 1)
    }
    else {
      setSoundDegree(prev => prev - 1)
    }
  }

  const toggleScreenDisplay = () => {
    if (!isScreenLocked) {
      setIsScreenDisplayOn(!isScreenDisplayOn)
    }
  }

  const toggleSoundDisplay = () => {
    if (!isSoundLocked) {
      setIsSoundDisplayOn(!isSoundDisplayOn)
    }
  }

  const toggleScreenLock = () => {
    setIsScreenLocked(!isScreenLocked)
  }

  const toggleSoundLock = () => {
    setIsSoundLocked(!isSoundLocked)
  }


  return (
    <div className={styles.player}>
      {
        consoleVideo ?
        <FullScreen handle={handle}>
          <video className={styles.video_frame} src={consoleVideo?.srcVideo} autoPlay loop muted></video>
        </FullScreen>
        : 
        <FullScreen handle={handle}>
          <video className={styles.video_frame} src='https://airsounds-media.s3.us-east-2.amazonaws.com/videos/player_background.mp4' autoPlay loop muted></video>
        </FullScreen>
      }
      
      {isProfileOn || isSettingOn ?
        <>
          <div className={styles.modal_overlay} onClick={closeModal}></div>
          {
            isProfileOn ?
            <MyProfile userInfo={userInfo} onEditUserInfo={onEditUserInfo} toggleProfileModal={toggleProfileModal} FileInput={FileInput}/> 
          :
            <div>SETTING</div>
          }
        </> :
        ''
        }
      <div className={styles.player_control}>
        <Header isLogin={isLogin} userInfo={userInfo} onLogout={onLogout} toggleProfileModal={toggleProfileModal} toggleSettingModal={toggleSettingModal}/>
        <main className={styles.main}>
          <section className={styles.main_left}>
            <MoodList moodsList={moods} onDelete={deleteMood}  selectMood={onMood}/>
          </section>
          <section className={styles.main_center}>
            <section className={styles.center}>
              <section className={styles.center_top}>
                  <Console
                    onSaveOrEdit={saveOrEditMood}
                    onDelete={deleteMood}
                    selectedVideo={consoleVideo}
                    selectedSoundsList={consoleSounds}
                    selectedMoodInfo={consoleMoodInfo}
                    unSelectMood={offMood}
                    unSelectVideo={offVideo}
                    unSelectSound={offSound}
                    controlVolume={controlVolume}
                    onMoodReset={onMoodReset}
                    getFullScreen={getFullScreen}
                    isLogin={isLogin}
                  />
              </section>
              <section className={styles.center_bottom} onWheel={ScreenWheelEvent} onMouseEnter={toggleScreenDisplay} onMouseLeave={toggleScreenDisplay}>
                <div className={`${styles.toggle_display} ${isScreenDisplayOn? '' : styles.screen_off}`}>
                  <div className={styles.toggle_locking}>
                    {
                      isScreenLocked ? <FontAwesomeIcon onClick={toggleScreenLock} className={styles.lock_icon} icon={faLock} />
                      : <FontAwesomeIcon onClick={toggleScreenLock} className={styles.lock_icon} icon={faLockOpen} />
                    }
                  </div>
                  <ScreenList videosList={videos} selectVideo={onVideo} unSelectVideo={offVideo} consoleVideo={consoleVideo?consoleVideo:undefined} videoDegree={videoDegree}/>
                </div>
              </section>
            </section>
          </section>
          <section className={styles.main_right} onWheel={soundWheelEvent} onMouseEnter={toggleSoundDisplay} onMouseLeave={toggleSoundDisplay}>
            <div className={`${styles.toggle_display} ${styles.sounds_circle} ${isSoundDisplayOn? '' : styles.sound_off}`}>
              <div className={styles.toggle_locking_sounds}>
                {
                  isSoundLocked ? <FontAwesomeIcon onClick={toggleSoundLock} className={styles.lock_icon} icon={faLock} />
                  : <FontAwesomeIcon onClick={toggleSoundLock} className={styles.lock_icon} icon={faLockOpen} />
                }
              </div>
              <SoundList soundsList={sounds} selectSound={onSound} unSelectSound={offSound} consoleSounds={consoleSounds} soundDegree={soundDegree}/>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Player;
