import React from 'react';
import styles from './console.module.css'

const Console = (props) => {
  return (
    <>
    <div className={styles.console}>

    </div>
        <div className={styles.console_bar}></div>
        <div className={styles.console_toggle}>
          <img className={`${styles.toggle_btn} ${styles.opened}`} src="./images/arrow_btn.png" alt="arrow" />
        </div>
    </>
  )
}

export default Console;