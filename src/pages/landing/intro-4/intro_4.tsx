import React from 'react';
import styles from './intro_4.module.css';

const intro4 = () => {
  return (
    <div className={styles.intro4_container}>
      <div className={styles.intro4_text}>Recommend using headphones before getting it</div>
      <div className={styles.intro4_media}>
        <img src="./images/intro2_img.png" alt="headphone" />
      </div>
    </div>
  )
}

export default intro4;