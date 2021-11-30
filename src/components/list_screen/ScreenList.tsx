import { VideoT } from "../../types/types";
import ScreenBall from "../ball_screen/ScreenBall";
import './list_screen.scss'

type ScreenListProps = {
  videosList: VideoT[];
  consoleVideo: VideoT | undefined;
  selectVideo: (video: VideoT) => void;
  unSelectVideo: (videoId: number) => void;
  videoDegree: number
};

const ScreenList = ({
  videosList,
  selectVideo,
  unSelectVideo,
  consoleVideo,
  videoDegree
}: ScreenListProps): JSX.Element => {

  return (
    <div className='circle-container' style={{transform: `rotate(${videoDegree}deg)`}}>
      {videosList.map((item) => {
        return consoleVideo?.id === item.id ?
        // <div className={`${styles.screen_ball_container} ${styles.screen_ball_selected}`} key={item.id} onClick={() => unSelectVideo(item.id!)}>
        <div className='screen_ball_container screen_ball_selected' key={item.id} onClick={() => unSelectVideo(item.id!)}>
          <ScreenBall video={item} />
        </div>
        :
        <div className='screen_ball_container' key={item.id} onClick={() => selectVideo(item)}>
          <ScreenBall video={item} />
        </div>
      })}
    </div>
  );
};

export default ScreenList;
