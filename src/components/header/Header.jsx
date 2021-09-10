import React from 'react';
import styles from './header.module.css'

const Header = (props) => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src="./images/christmas-tree.png" alt="logo" />
      <div>AirSounds</div>
      <div>
        <span>login</span>
        <span>signup</span>
      </div>
    </header>
  )
}

export default Header;