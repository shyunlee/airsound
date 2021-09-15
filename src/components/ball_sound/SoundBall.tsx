import React from 'react';
import { SoundT } from '../../types/types';
import styles from './sound_ball.module.css';

const SoundBall = ({sound}: {sound:SoundT}): JSX.Element => {
  return (
    <div className={styles.sound_ball}>
      <img className={styles.sound_ball_img} src={sound.srcImage} alt={sound.title} />
    </div>
  )
}

export default SoundBall;