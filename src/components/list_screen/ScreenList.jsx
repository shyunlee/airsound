import React from 'react';
import { screenList } from '../../data';
import ScreenBall from '../ball_screen/ScreenBall';
import styles from './list_screen.module.css';


const ScreenList = (props) => {
  return (
    <div className={styles.screen_list}>
      {screenList.map(item => <div className={styles.screen_ball_container}><ScreenBall key={item.id} screen={item}/></div>)}
    </div>
  )
}

export default ScreenList;