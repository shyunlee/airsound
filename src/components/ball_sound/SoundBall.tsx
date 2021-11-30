import React from 'react';
import { SoundT } from '../../types/types';
import styles from './sound_ball.module.css';

type SoundBallProps = {
  sound: SoundT;
  soundDegree?: number;
}

const SoundBall = ({sound, soundDegree}: SoundBallProps): JSX.Element => {

  const soundRotateDeg = -1 * soundDegree!
  return (
    <div className={styles.sound_ball} style={{transform: `rotate(${soundRotateDeg}deg)`}} title={sound.title}>
      <img className={styles.sound_ball_img} src={sound.srcImage} alt={sound.title} />
    </div>
  )
}

export default SoundBall;