import React from 'react';
import { useHistory } from 'react-router';
import { UserT } from '../../types/types';
import Avatar from '../avatar/Avatar';
import styles from './header.module.css'

type HeaderProps = {
  isLogin: Boolean;
  userInfo: UserT | undefined;
  onLogout: () => void;
}

const Header = ({isLogin, userInfo, onLogout}: HeaderProps): JSX.Element => {
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
            (<span className={styles.control_myprofile}>
              <Avatar srcImage={userInfo?.srcImage} username={userInfo?.username}/>
              <button onClick={onLogout}>Logout</button>
            </span>)
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