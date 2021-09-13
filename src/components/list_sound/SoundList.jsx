import React from 'react';
import { soundList } from '../../data';
import SoundBall from '../ball_sound/SoundBall';
import styles from './list_sound.module.css'


const SoundList = (props) => {
  return (
    <div className={styles.sound_list}>
      {soundList.map(item => <div className={styles.ball_sound_container}><SoundBall key={item.id} sound={item}/></div>)}
    </div>
  )
}

export default SoundList;