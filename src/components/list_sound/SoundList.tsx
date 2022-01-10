import React from "react";
import { SoundT } from "../../types/types";
import SoundBall from "../ball_sound/SoundBall";
import './list_sound.scss'

type SoundListProps = {
  soundsList: SoundT[];
  consoleSounds: SoundT[];
  selectSound: (sound: SoundT) => void;
  unSelectSound: (soundId: number) => void;
  soundDegree: number;
  isMobileSize: Boolean;
};

const SoundList = ({
  soundsList,
  consoleSounds,
  selectSound,
  unSelectSound,
  soundDegree,
  isMobileSize
}: SoundListProps): JSX.Element => {

  return (
    <div className={!isMobileSize ? 'sound-circle-container' : 'sound-list-container'} style={!isMobileSize ? {transform: `rotate(${soundDegree}deg)`} : {}}>
      {soundsList.map((item) => {
        return consoleSounds.filter((selected) => selected.id === item.id).length === 0 ? (
          <div className='ball_sound_container' key={item.id} onClick={() => selectSound(item)}>
            <SoundBall sound={item} soundDegree={!isMobileSize ? soundDegree : 0}/>
          </div>
        ) : (
          <div className='ball_sound_container ball_sound_selected' key={item.id} onClick={() => unSelectSound(item.id!)}>
            <SoundBall sound={item} soundDegree={soundDegree}/>
          </div>
        );
      })}
    </div>
  );
};

export default SoundList;
