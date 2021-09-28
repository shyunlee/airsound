import React, { memo } from 'react';
import { SoundT } from '../../types/types';
import styles from './sound_ball.module.css';

type SoundBallProps = {
  sound: SoundT;
}

const SoundBall = ({sound}: SoundBallProps): JSX.Element => {
  // console.log(sound.srcImage)
  return (
    <div className={styles.sound_ball}>
      <img className={styles.sound_ball_img} src={sound.srcImage} alt={sound.title} />
    </div>
  )
}

export default SoundBall;