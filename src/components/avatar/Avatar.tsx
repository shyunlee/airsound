import React from 'react';
import styles from './avatar.module.css';


type AvatarProps = {
  srcImage?: string;
  email?:string;
  username?: string;
  onLogout: () => void;
  toggleProfileModal: () => void;
  toggleSettingModal: () => void;
}

const Avatar = ({srcImage, email, username, onLogout, toggleProfileModal, toggleSettingModal}: AvatarProps): JSX.Element => {
  return (
    <div className={styles.avatar}>
      <img className={styles.avatar_img} src={srcImage || './images/default_profile.png' } alt="" />
      <div className={styles.avatar_drop_container}>
        <div className={styles.avatar_drop}>
          <div className={styles.avatar_drop_top}>
            <div className={styles.user_img}>
              <img className={styles.avatar_img} src={srcImage || './images/default_profile.png' } alt="" />
            </div>
            <div className={styles.user_info}>
              <p className={styles.username}>{username}</p>
              <p className={styles.email}>{email}</p>
            </div>
          </div>
          <div className={styles.avatar_drop_bottom}>
            <div className={`${styles.avatar_drop_menu} ${styles.myprofile}`} onClick={toggleProfileModal}>My Profile</div>
            {/* <div className={`${styles.avatar_drop_menu} ${styles.setting}`} onClick={toggleSettingModal}>Setting</div> */}
            <div className={`${styles.avatar_drop_menu} ${styles.logout}`} onClick={onLogout}>Logout</div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Avatar;