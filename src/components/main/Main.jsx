import React from 'react';
import Console from '../console/Console';
import MoodList from '../list_mood/MoodList';
import ScreenList from '../list_screen/ScreenList';
import SoundList from '../list_sound/SoundList';
import styles from './main.module.css'

const Main = (props) => {
  return (
    <main className={styles.main}>
      <section className={styles.main_left}>
        <MoodList />
      </section>
      <section className={styles.main_top}>
        <Console />
      </section>
      <section className={styles.main_bottom}>
        <ScreenList />
      </section>
      <section className={styles.main_right}>
        <SoundList />
      </section>
    </main>
  )
}

export default Main;