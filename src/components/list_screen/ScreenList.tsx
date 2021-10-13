import React from "react";
import { VideoT } from "../../types/types";
import ScreenBall from "../ball_screen/ScreenBall";
import styles from "./list_screen.module.css";

type ScreenListProps = {
  videosList: VideoT[];
  consoleVideo: VideoT | undefined;
  selectVideo: (video: VideoT) => void;
  unSelectVideo: (videoId: number) => void;
};

const ScreenList = ({
  videosList,
  selectVideo,
  unSelectVideo,
  consoleVideo,
}: ScreenListProps): JSX.Element => {
  return (
    <div className={styles.screen_list}>
      {videosList.map((item) => {
        return consoleVideo?.id === item.id ?
        <div className={`${styles.screen_ball_container} ${styles.screen_ball_selected}`} key={item.id} onClick={() => unSelectVideo(item.id!)}>
          <ScreenBall video={item} />
        </div>
        :
        <div className={styles.screen_ball_container} key={item.id} onClick={() => selectVideo(item)}>
          <ScreenBall video={item} />
        </div>
      })}
    </div>
  );
};

export default ScreenList;
