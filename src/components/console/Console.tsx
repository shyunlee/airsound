import React, { useEffect, useRef, useState } from 'react';
import styles from './console.module.css'
import SoundCard from '../card_sound/SoundCard';
import ScreenBall from '../ball_screen/ScreenBall'
import { MoodOnConsoleT, VideoT, SoundT, ResponseDataT } from '../../types/types'

type ConsoleProps = {
  onSave: (consoleMoodInfo: MoodOnConsoleT, consoleVideo: VideoT, consoleSounds: SoundT[] ) => Promise<Boolean>;
  onDelete: (moodId: number) => Promise<void>;
  selectedVideo: VideoT | undefined;
  selectedSoundsList: SoundT[];
  selectedMoodInfo: MoodOnConsoleT;
  unSelectMood: () => void;
  unSelectVideo: () => void;
  unSelectSound: (soundId: number) => void;
}

const Console = ({
  onSave, 
  onDelete,
  selectedVideo,
  selectedSoundsList,
  selectedMoodInfo,
  unSelectMood,
  unSelectVideo,
  unSelectSound
}: ConsoleProps): JSX.Element => {
  const [toggleDisplay, setToggleDisplay] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<HTMLInputElement>(null)

  const onToggleDisplay = () => {
    setToggleDisplay(!toggleDisplay)
  }

  const deleteMoodOnConsole = () => {
    onDelete(selectedMoodInfo.id!)
    unSelectMood()
  }

  const saveMoodOnConsole = async () => {
    // if (!Number(timerRef.current?.value)) {
    //   window.alert('Please set timer in number')
    //   return;
    // }
    if (selectedVideo === undefined && selectedSoundsList.length === 0) {
      return;
    }
    const moodInfo = {
      title: titleRef.current?.value! || 'none',
      timer: Number(timerRef.current?.value) || 5600
    }
    const isSaved = await onSave(moodInfo, selectedVideo!, selectedSoundsList)
    console.log(isSaved)
    if (isSaved) {
      return window.alert('Saved')
    }
    window.alert('Something went wrong')
  }
  
  console.log('console')
  return (
    <>
    {
      selectedVideo === undefined && selectedSoundsList.length === 0 ?
      ''
      :
      <div className={styles.console_controller}>
        <div className={styles.console_contoller_box}>
          <button className={`${styles.console_control_btn} ${styles.play}`}>P</button>
          <button className={`${styles.console_control_btn} ${styles.save}`} onClick={saveMoodOnConsole}>S</button>
          <button className={`${styles.console_control_btn} ${styles.delete}`} onClick={unSelectMood}>C</button>
          {
            selectedMoodInfo.id ? 
            <>
              <button className={`${styles.console_control_btn} ${styles.reset}`}>R</button>
              <button className={`${styles.console_control_btn} ${styles.delete}`} onClick={deleteMoodOnConsole}>D</button>
            </>
            :
              ''
          }
        </div>
      </div>
    }
      <div className={styles.console_container}>
        <div className={`${styles.console} ${toggleDisplay?styles.closed:''}`}>
        {
          selectedSoundsList.length===0 && selectedVideo === undefined
          ?
          ''
          : 
          <div className={styles.console_top}>
          {
            selectedVideo ? 
            <div className={styles.selected_screen}>
              <ScreenBall video={selectedVideo}/>
              <button className={styles.clear_screen_btn} onClick={unSelectVideo}>X</button>
            </div>
            : ''
          }
          <div className={styles.mood_info}>
            <input ref={titleRef} name='title' type="text" placeholder={selectedMoodInfo.title === ''?"Mood Title":selectedMoodInfo.title.slice(0,1).toUpperCase().concat(selectedMoodInfo.title.slice(1))}/>
            <input ref={timerRef} name='timer' type="text" placeholder={`${selectedMoodInfo.timer}`}/>
          </div>
        </div>
        }
          <div>
            {selectedSoundsList.map(item => <SoundCard key={item.id} sound={item} unSelectSound={unSelectSound}/>)}
          </div>
        </div>
          <div className={`${styles.console_toggle} ${toggleDisplay?styles.closed:''}`}>
            <div className={styles.console_bar}></div>
            <img className={`${styles.toggle_btn} ${toggleDisplay?styles.closed:''}`} onClick={onToggleDisplay} src="./images/arrow_btn.png" alt="arrow" />
          </div>
      </div>
    </>
  )
}

export default Console;