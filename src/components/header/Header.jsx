import React from 'react';
import styles from './header.module.css'

const Header = ({isLogin, user}) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logo_img} src="./images/christmas-tree.png" alt="logo" />
      </div>
      <div className={styles.title}>Air Sounds</div>
      <div className={styles.control_container}>
        {
          isLogin ?
            (<span className={styles.control_myprofile}>My Profile</span>)
          :
          <>
            <span className={styles.control_login}>Login</span>
          </>
        }
      </div>
    </header>
  )
}

export default Header;