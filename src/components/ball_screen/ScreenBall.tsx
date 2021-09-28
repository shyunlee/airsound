import React from 'react';
import { VideoT } from '../../types/types';
import styles from './ball_screen.module.css'

type ScreenBallProps = {
  video: VideoT | undefined;
}


const ScreenBall = ({video}: ScreenBallProps): JSX.Element => {
  return (
    <div className={styles.screen_ball}>
      <img className={styles.screen_ball_img} src={video?.srcImage} alt={video?.title} />
    </div>
  )
}

export default ScreenBall;