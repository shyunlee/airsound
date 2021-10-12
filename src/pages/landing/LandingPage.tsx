import React from 'react';
import Intro_1 from './intro-1/Intro_1';
// import Intro_2 from './intro-2/intro_2';
import styles from './landing_page.module.css';

type LandingProps = {
  isLogin: Boolean;
}

const LandingPage = ({isLogin}: LandingProps): JSX.Element => {
  return (
    <div className={styles.landing}>
      <Intro_1 isLogin={isLogin}/>
    </div>
  )
}

export default LandingPage;