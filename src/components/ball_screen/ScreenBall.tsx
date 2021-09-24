import React from 'react';
import { VideoT } from '../../types/types';
import styles from './ball_screen.module.css'

type ScreenBallProps = {
  screen: VideoT;
  isActive?: boolean
}


const ScreenBall = ({screen, isActive}: ScreenBallProps): JSX.Element => {
  return (
    <div className={styles.screen_ball}>
      <img className={styles.screen_ball_img} src={screen.srcImage} alt={screen.title} />
    </div>
  )
}

export default ScreenBall;