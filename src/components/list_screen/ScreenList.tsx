import React from "react";
import { screenList } from "../../data";
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
      {screenList.map((item) => (
        <div className={styles.screen_ball_container} key={item.id}>
          <ScreenBall screen={item} isActive={consoleVideo?.id === item.id? true: false} />
        </div>
      ))}
    </div>
  );
};

export default ScreenList;
