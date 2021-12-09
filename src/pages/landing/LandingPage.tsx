import React from 'react';
import Intro1 from './intro-1/Intro_1';
import Intro4 from './intro-4/intro_4';
import styles from './landing_page.module.css';

type LandingProps = {
  isLogin: Boolean;
}

const LandingPage = ({isLogin}: LandingProps): JSX.Element => {

  return (
    <div className={styles.landing}>
      <Intro1 isLogin={isLogin}/>
      <Intro4 />
    </div>
  )
}

export default LandingPage;