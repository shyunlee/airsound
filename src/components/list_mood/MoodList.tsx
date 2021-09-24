import React from 'react';
import { moodList } from '../../data';
import { MoodListT, MoodT } from '../../types/types';
import MoodCard from '../card_mood/MoodCard';
import styles from './mood_list.module.css'

type MoodListProps = {
  onDelete: (moodId: number) => Promise<void>;
  moodsList: MoodListT;
  selectMood: (mood: MoodT) => void;
}

const MoodList = ({onDelete, moodsList, selectMood}: MoodListProps): JSX.Element => {
  return (
    <>
      <div className={styles.mood_list}>
        {moodList.map(item => <MoodCard key={item.id} mood={item}/>)}
      </div>
      <div className={styles.mood_list_bar}></div>
      <div className={styles.mood_list_toggle}>
        <img className={`${styles.toggle_btn} ${styles.opened}`} src="./images/arrow_btn.png" alt="arrow" />
      </div>
    </>
  )
}

export default MoodList;