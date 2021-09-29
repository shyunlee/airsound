import React from 'react';
import styles from './avatar.module.css';


type AvatarProps = {
  srcImage?: string;
  email?:string;
  username?: string;
  onLogout: () => void;
}

const Avatar = ({srcImage, email, username, onLogout}: AvatarProps): JSX.Element => {
  return (
    <div className={styles.avatar}>
      <img className={styles.avatar_img} src="./images/christmas-tree.png" alt="" />
      <div className={styles.avatar_drop_container}>
        <div className={styles.avatar_drop}>
          <div className={styles.avatar_drop_top}>
            <div className={styles.user_img}>
              <img className={styles.avatar_img} src="./images/christmas-tree.png" alt="" />
            </div>
            <div className={styles.user_info}>
              <p className={styles.username}>{username}</p>
              <p className={styles.email}>{email}</p>
            </div>
          </div>
          <div className={styles.avatar_drop_bottom}>
            <div className={`${styles.avatar_drop_menu} ${styles.myprofile}`}>My Profile</div>
            <div className={`${styles.avatar_drop_menu} ${styles.setting}`}>Setting</div>
            <div className={`${styles.avatar_drop_menu} ${styles.logout}`} onClick={onLogout}>Logout</div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Avatar;