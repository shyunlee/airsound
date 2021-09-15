import React from 'react';
import { VideoT } from '../../types/types';
import styles from './ball_screen.module.css'




const ScreenBall = ({screen}: {screen: VideoT}): JSX.Element => {
  return (
    <div className={styles.screen_ball}>
      <img className={styles.screen_ball_img} src={screen.srcImage} alt={screen.title} />
    </div>
  )
}

export default ScreenBall;