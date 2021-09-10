import React from 'react';
import styles from './ball_screen.module.css'

const ScreenBall = ({screen}) => {
  return (
    <div className={styles.screen_ball}>
      <img className={styles.screen_ball_img} src={screen.srcImage} alt={screen.title} />
    </div>
  )
}

export default ScreenBall;