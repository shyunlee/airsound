import React from 'react';
import styles from './avatar.module.css';


type AvatarProps = {
  srcImage?: string;
  username?: string;
}

const Avatar = ({srcImage, username}: AvatarProps): JSX.Element => {
  return (
    <>
      <img className={styles.avatar_img} src="./images/christmas-tree.png" alt="" />
    </>
  )
}

export default Avatar;