import React from 'react';
import styles from './console.module.css'
import { soundList, screenList } from '../../data';
import SoundCard from '../card_sound/SoundCard';
import ScreenBall from '../ball_screen/ScreenBall'
import { MoodOnConsoleT, VideoT, SoundT } from '../../types/types'

const selectedSound = soundList.slice(0,4)
const selectedScreen = screenList[0]

type ConsoleProps = {
  onSave: (consoleMoodInfo: MoodOnConsoleT, consoleVideo: VideoT, consoleSounds: SoundT[] ) => Promise<void>;
  onDelete: (moodId: number) => Promise<void>;
  selectedVideo: VideoT | undefined;
  selectedSoundsList: SoundT[];
  selectedMoodInfo: MoodOnConsoleT;
  unSelectMood: () => void;
  unSelectSound: (soundId: number) => void;
}

const Console = ({
  onSave, 
  onDelete,
  selectedVideo,
  selectedSoundsList,
  selectedMoodInfo,
  unSelectMood,
  unSelectSound
}: ConsoleProps): JSX.Element => {
  
  return (
    <>
    <div className={styles.console}>
      <div className={styles.selected_screen}>
        <ScreenBall screen={selectedScreen}/>
      </div>
      <div>
        {selectedSound.map(item => <SoundCard key={item.id} sound={item} unSelectSound={unSelectSound}/>)}
      </div>
    </div>
        <div className={styles.console_bar}>

        </div>
        <div className={styles.console_toggle}>
          <img className={`${styles.toggle_btn} ${styles.opened}`} src="./images/arrow_btn.png" alt="arrow" />
        </div>
    </>
  )
}

export default Console;