import React from 'react';
import { soundList } from '../../data';
import SoundBall from '../ball_sound/SoundBall';
import styles from './list_sound.module.css'


const SoundList = (): JSX.Element => {
  return (
    <div className={styles.sound_list}>
      {soundList.map(item => <div className={styles.ball_sound_container} key={item.id}><SoundBall sound={item}/></div>)}
    </div>
  )
}

export default SoundList;