import React from 'react';
import { useHistory } from 'react-router';
import styles from './intro_1.module.css';

type Intro1Props = {
  isLogin: Boolean;
}

const Intro_1 = ({isLogin}: Intro1Props): JSX.Element => {
  const history = useHistory()

  const clickLogin = () => {
    history.push('/login')
  }

  const clickTryIt = () => {
    history.push('/player')
  }

  return (
    <div className={styles.intro_container}>
      <video className={styles.intro_video} src="./images/intro_1_background.mp4" autoPlay loop muted></video>
      <div className={styles.overlay}></div>
      <div className={styles.intro_contents}>
        <section className={styles.intro_logo}>
          <img className={styles.intro_logo} src="./images/wrapsounds_logo.png" alt="logo" />
        </section>
        <section className={styles.intro_main}>
          <div className={styles.intro_center}>
            <h3>I know you've been tired of your day...</h3>
            <h2>Now, Be relax with us, 'WrapSounds'</h2>
            <div className={styles.intro_buttons}>
              {isLogin ? 
                <button onClick={clickTryIt}>Go To Player</button>
                :
                <>
                  <button onClick={clickLogin}>LOGIN</button>
                  <button onClick={clickTryIt}>TRY IT</button>
                </>
              }
            </div>
          </div>
        </section>
      </div>
      {/* <section className={styles.intro_background}>
        <video className={styles.intro_video} src="./images/intro_1_background.mp4" autoPlay loop muted>
        </video>
      </section>
      <section className={styles.intro_logo}>
        logo
      </section>
      <section className={styles.intro_main}>
        <h3>I know you've been tired of your day</h3>
        <h2>Now, Be relax with us, 'WrapSounds'</h2>
        <div className={styles.intro_buttons}>
          <button>LOGIN</button>
          <button>TRY IT</button>
        </div>
      </section> */}
    </div>
  )
}

export default Intro_1;