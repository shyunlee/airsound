import React from 'react';
import styles from './card_sound.module.css'
import SoundBall from '../ball_sound/SoundBall'
import { SoundT } from '../../types/types';

type SoundCardProps = {
  sound: SoundT;
  unSelectSound: (soundId: number) => void;
}

const SoundCard = ({sound, unSelectSound}: SoundCardProps): JSX.Element => {
  return (
    <div className={styles.card}>
      <div className={styles.sound_ball}>
        <SoundBall sound={sound}/>
      </div>
      <div className={styles.volume}>
        <div className={styles.volume_display}>
          <span className={styles.volume_point}></span>
          <span className={styles.volume_point}></span>
          <span className={styles.volume_point}></span>
          <span className={styles.volume_point}></span>
          <span className={styles.volume_point}></span>
          <span className={styles.volume_number}>{sound.volume}</span>
          <div className={styles.volume_btn}>
            <img className={styles.volume_up} src="./images/arrow_btn.png" alt="volume_up" />
            <img className={styles.volume_down} src="./images/arrow_btn.png" alt="volume_down" />
          </div>
        </div>
      </div>
      <button className={styles.remove_btn}>X</button>
    </div>
  )
}

export default SoundCard;