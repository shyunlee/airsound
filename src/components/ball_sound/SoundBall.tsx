import React from 'react';
import { SoundT } from '../../types/types';
import styles from './sound_ball.module.css';

type SoundBallProps = {
  sound: SoundT;
  selectSound?: (sound: SoundT) => void;
  unSelectSound?: (soundId: number) => void;
  isActive?: boolean;
}

const SoundBall = ({sound, selectSound, unSelectSound, isActive}: SoundBallProps): JSX.Element => {
  return (
    <div className={styles.sound_ball}>
      <img className={styles.sound_ball_img} src={sound.srcImage} alt={sound.title} />
    </div>
  )
}

export default SoundBall;