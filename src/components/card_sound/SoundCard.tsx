import React, { useEffect, useRef, useState } from 'react';
import styles from './card_sound.module.css'
import SoundBall from '../ball_sound/SoundBall'
import { SoundT } from '../../types/types';

type SoundCardProps = {
  sound: SoundT;
  unSelectSound: (soundId: number) => void;
  isPlaying: Boolean;
  controlVolume: (customVolume: number, soundId?: number) => void;
}

const volumeConverter = (int: number | undefined) => {
  switch (int) {
    case 0: 
      return 0;
    case 1:
      return 0.2;
    case 2:
      return 0.4; 
    case 3:
      return 0.6;
    case 4:
      return 0.8;
    case 5:
      return 1;
    default:
      return 0.6;
  }
}

const SoundCard = ({sound, unSelectSound, isPlaying, controlVolume}: SoundCardProps): JSX.Element => {
  const [volume, setVolume] = useState( sound.customVolume || sound.volume || 3)
  const audio = new Audio(sound.srcSound)
  const audioRef = useRef(audio)
  audioRef.current.volume = volumeConverter(volume)
  



  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play()
        audioRef.current.loop = true
      }
      , 0)
      // const observer = new IntersectionObserver()
    } else {
      audioRef.current.pause()
    }
    return () => audioRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    controlVolume(volume, sound?.id)
  }, [volume])

  useEffect(() => {
    setVolume(prev => sound.customVolume || prev)
  }, [sound])

  const testVolumeUp = () => {
    if (audioRef.current.volume < 0.9) {
      audioRef.current.volume = audioRef.current.volume + 0.2
      setVolume(volume+1)
    }
  }

  const testVolumeDown = () => {
    if (audioRef.current.volume >= 0.2) {
      audioRef.current.volume = audioRef.current.volume - 0.2
      setVolume(volume-1)
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.sound_ball}>
        <SoundBall sound={sound}/>
      </div>
      <div className={styles.volume}>
        <div className={styles.volume_display}>
          <span className={`${styles.volume_point} ${volume >= 1? styles.volume_active : ''}`}></span>
          <span className={`${styles.volume_point} ${volume >= 2? styles.volume_active : ''}`}></span>
          <span className={`${styles.volume_point} ${volume >= 3? styles.volume_active : ''}`}></span>
          <span className={`${styles.volume_point} ${volume >= 4? styles.volume_active : ''}`}></span>
          <span className={`${styles.volume_point} ${volume === 5? styles.volume_active : ''}`}></span>
          <span className={styles.volume_number}>{volume}</span>
          <div className={styles.volume_btn}>
            <img className={styles.volume_up} src="./images/arrow_btn.png" alt="volume_up" onClick={testVolumeUp}/>
            <img className={styles.volume_down} src="./images/arrow_btn.png" alt="volume_down" onClick={testVolumeDown}/>
          </div>
        </div>
      </div>
      <button className={styles.remove_btn} onClick={() => unSelectSound(sound.id!)}>X</button>
    </div>
  )
}

export default SoundCard;