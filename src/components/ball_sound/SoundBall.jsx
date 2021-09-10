import React from 'react';
import styles from './sound_ball.module.css';

const SoundBall = ({sound}) => {
  return (
    <div className={styles.sound_ball}>
      <img className={styles.sound_ball_img} src={sound.srcImage} alt={sound.title} />
    </div>
  )
}

export default SoundBall;