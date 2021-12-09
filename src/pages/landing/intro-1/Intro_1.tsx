import React from 'react';
import { Fade, Bounce, Zoom } from 'react-awesome-reveal'
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
      <Fade triggerOnce={true} delay={300}>
        <video className={styles.intro_video} src="./images/intro_1_background.mp4" autoPlay loop muted></video>
      </Fade>
      <div className={styles.overlay}></div>
      <div className={styles.intro_contents}>
        <section className={styles.intro_logo}>
          <Fade triggerOnce={true} delay={2000}><Bounce triggerOnce={true} delay={3000}>
            <img className={styles.intro_logo} src="./images/wrapsounds_logo.png" alt="logo" />
          </Bounce></Fade>
        </section>
        <section className={styles.intro_main}>
          <div className={styles.intro_center}>
            <Fade triggerOnce={true} delay={700} direction={'up'}>
              <h3>I know you've been tired of your day...</h3>
            </Fade>
            <Fade triggerOnce={true} delay={1500} direction={'up'}>
              <h2>Now, Be relax with us, 'WrapSounds'</h2>
            </Fade>
            <div className={styles.intro_buttons}>
              {isLogin ? 
                <Fade triggerOnce={true} delay={2000}><Zoom triggerOnce={true} delay={2500}><button onClick={clickTryIt}>Go To Player</button></Zoom></Fade>
                :
                <>
                  <Fade triggerOnce={true} delay={2000}><Zoom triggerOnce={true} delay={2500}><button onClick={clickLogin}>LOGIN</button></Zoom></Fade>
                  <Fade triggerOnce={true} delay={2000}><Zoom triggerOnce={true} delay={2500}><button onClick={clickTryIt}>TRY IT</button></Zoom></Fade>
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