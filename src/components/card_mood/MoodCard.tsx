import React from 'react';
import { MoodT } from '../../types/types';
import ScreenBall from '../ball_screen/ScreenBall'
import SoundBall from '../ball_sound/SoundBall'
import styles from './card_mood.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlay } from '@fortawesome/free-solid-svg-icons'



type MoodCardProps = {
  mood: MoodT;
  selectMood: (mood: MoodT) => void;
  onDelete: (moodId: number) => Promise<void>;
}

const MoodCard = ({mood, selectMood, onDelete}: MoodCardProps): JSX.Element => {
  return (
    <div className={styles.mood_card}>
      <div className={styles.mood_screen_container}>
        <div className={styles.mood_screen}>
          <ScreenBall video={mood.video}/>
        </div>
      </div>
      <div className={styles.mood_info}>
        <div className={styles.mood_sounds_container}>
          <div className={styles.mood_title}>
            {mood.title.slice(0,1).toUpperCase().concat(mood.title.slice(1))}
          </div>
          <div className={styles.mood_sounds}>
            {mood.sounds.map(item => <div key={item.id} className={styles.sound_ball}><SoundBall sound={item} /></div>)}
          </div>
        </div>
        <div className={styles.mood_control}>
          <button title='Play Mood' className={`${styles.mood_control_btn} ${styles.play}`} onClick={() => selectMood(mood)}>
            <FontAwesomeIcon icon={faPlay}/>
          </button>
          <button title='Delete Mood' className={`${styles.mood_control_btn} ${styles.delete}`} onClick={() => onDelete(mood.id!)}>
            <FontAwesomeIcon icon={faTrashAlt}/>
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default MoodCard;