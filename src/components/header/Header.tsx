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

  const clickLogo = () => {
    history.push('/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={clickLogo}>
        <img className={styles.logo_img} src="./images/christmas-tree.png" alt="logo" />
      </div>
      <div className={styles.title}>Wrap Sounds</div>
      <div className={styles.control_container}>
        {
          isLogin ?
            <Avatar srcImage={userInfo?.srcImage} email={userInfo?.email} username={userInfo?.username} onLogout={onLogout}/>
          :
          <>
            <button className={styles.control_login} onClick={clickLogin}>Login</button>
          </>
        }
      </div>
    </header>
  )
}

export default Header;