import React from 'react';
import styles from './console.module.css'
import { soundList, screenList } from '../../data';
import SoundCard from '../card_sound/SoundCard';
import ScreenBall from '../ball_screen/ScreenBall'

const selectedSound = soundList.slice(0,4)
const selectedScreen = screenList[0]

const Console = (props) => {
  
  return (
    <>
    <div className={styles.console}>
      <div className={styles.selected_screen}>
        <ScreenBall screen={selectedScreen}/>
      </div>
      <div>
        {selectedSound.map(item => <SoundCard key={item.id} sound={item}/>)}
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