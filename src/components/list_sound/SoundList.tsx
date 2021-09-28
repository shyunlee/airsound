import React from "react";
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
      {soundsList.map((item) => {
        return consoleSounds.filter((selected) => selected.id === item.id).length === 0 ? (
          <div className={styles.ball_sound_container} key={item.id} onClick={() => selectSound(item)}>
            <SoundBall sound={item} />
          </div>
        ) : (
          <div className={styles.ball_sound_container} key={item.id} onClick={() => unSelectSound(item.id!)}>
            <SoundBall sound={item} />
          </div>
        );
      })}
    </div>
  );
};

export default SoundList;
