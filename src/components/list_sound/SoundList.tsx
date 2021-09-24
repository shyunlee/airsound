import React from "react";
import { soundList } from "../../data";
import { SoundT } from "../../types/types";
import SoundBall from "../ball_sound/SoundBall";
import styles from "./list_sound.module.css";

type SoundListProps = {
  soundsList: SoundT[];
  consoleSounds: SoundT[];
  selectSound: (sound: SoundT) => void;
  unSelectSound: (soundId: number) => void;
};

const SoundList = ({
  soundsList,
  consoleSounds,
  selectSound,
  unSelectSound,
}: SoundListProps): JSX.Element => {
  return (
    <div className={styles.sound_list}>
      {soundList.map((item) => (
        <div className={styles.ball_sound_container} key={item.id}>
          <SoundBall
            sound={item}
            selectSound={selectSound}
            unSelectSound={unSelectSound}
            isActive={consoleSounds.filter(selected=> selected.id === item.id).length === 0 ? false : true}
          />
        </div>
      ))}
    </div>
  );
};

export default SoundList;
