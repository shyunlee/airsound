import React, { useEffect, useState } from 'react';
import styles from './card_sound.module.css'
import SoundBall from '../ball_sound/SoundBall'
import { SoundT } from '../../types/types';

type SoundCardProps = {
  sound: SoundT;
  unSelectSound: (soundId: number) => void;
}

const SoundCard = ({sound, unSelectSound}: SoundCardProps): JSX.Element => {
  const audio = new Audio(sound.srcSound)
  audio.volume = 0.2
  useEffect(() => {
    setTimeout(() => audio.play(), 1000)
    return () => {audio.pause()}
  }, [])

  const testVolumeUp = () => {
    if (audio.volume < 0.9) {
      audio.volume = audio.volume + 0.2
    }
  }

  const testVolumeDown = () => {
    if (audio.volume > 0.1) {
      audio.volume = audio.volume - 0.2
    }
  }
  
  return (
    <div className={styles.card}>
      <div className={styles.sound_ball}>
        <SoundBall sound={sound}/>
      </div>
      <div className={styles.volume}>
        <div className={styles.volume_display}>
          <span className={styles.volume_point}></span>
          <span className={styles.volume_point}></span>
          <span className={styles.volume_point}></span>
          <span className={styles.volume_point}></span>
          <span className={styles.volume_point}></span>
          <span className={styles.volume_number}>{sound.customVolume?sound.customVolume:sound.volume}</span>
          <div className={styles.volume_btn}>
            <img className={styles.volume_up} src="./images/arrow_btn.png" alt="volume_up" onClick={testVolumeUp}/>
            <img className={styles.volume_down} src="./images/arrow_btn.png" alt="volume_down" onClick={testVolumeDown}/>
          </div>
        </div>
      </div>
      <button className={styles.remove_btn} onClick={() => unSelectSound(sound.id!)}>X</button>
      {/* <audio src='https://airsounds-media.s3.us-east-2.amazonaws.com/sounds/train.mp3' autoPlay={isPlaying}></audio> */}
    </div>
  )
}

export default SoundCard;