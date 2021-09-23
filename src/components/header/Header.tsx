import React from 'react';
import { useHistory } from 'react-router';
import styles from './header.module.css'

const Header = ({isLogin}: {isLogin: Boolean}): JSX.Element => {
  const history = useHistory()

  const clickLogin = () => {
    history.push('/login')
  }

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
            <span className={styles.control_login} onClick={clickLogin}>Login</span>
          </>
        }
      </div>
    </header>
  )
}

export default Header;