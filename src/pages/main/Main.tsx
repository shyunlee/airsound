import React from 'react';
import Header from '../../components/header/Header'
import Console from '../../components/console/Console';
import MoodList from '../../components/list_mood/MoodList';
import ScreenList from '../../components/list_screen/ScreenList';
import SoundList from '../../components/list_sound/SoundList';
import styles from './main.module.css'

type MainProps = {
  isLogin:Boolean;
}

const Main = ({isLogin}: MainProps): JSX.Element => {
  return (
    <>
      <Header isLogin={isLogin}/>
      <main className={styles.main}>
      <section className={styles.main_left}>
        <MoodList />
      </section>
      <section className={styles.main_center}>
        <section className={styles.center}>
          <section className={styles.center_top}>
            <Console />
          </section>
          <section className={styles.center_bottom}>
            <ScreenList />
          </section>
        </section>
      </section>
      <section className={styles.main_right}>
        <SoundList />
      </section>
    </main>
    </>
    
  )
}

export default Main;