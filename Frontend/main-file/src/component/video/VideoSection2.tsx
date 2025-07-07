import BounceAnimatedBtn from "../utils/BounceAnimatedBtn";
import { useAppDispatch } from "../../redux/hooks";
import { toggleVideoModalOpen } from "../../redux/features/videoModalSlice";
type Props = {
  innerPage?: boolean;
};
const VideoSection2 = ({ innerPage }: Props) => {
  const dispatch = useAppDispatch();
  const openVideoModal = () => {
    dispatch(toggleVideoModalOpen());
  };
  return (
    <div
      className={`rv-1-video ${innerPage ? "rv-project-details__video" : ""}`}
    >
      <div className="container">
        <div className="row gy-3 align-items-center">
          <div className="col-xl-9 col-lg-8">
            <div className="rv-1-video__txt">
              <div>
                <h4 className="rv-1-video__title rv-1-section__title rv-text-anime">
                  Live Streaming
                </h4>
              </div>
              <div>
                <p className="rv-1-video__descr">
                  <span>
                    Event planners help clients organize and coordinate aspects
                    of events.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4 text-end">
            <div className="rv-1-video__btn">
              <BounceAnimatedBtn>
                <a
                  className="video-play-btn"
                  role="button"
                  onClick={openVideoModal}
                >
                  <i className="fa-solid fa-sharp fa-play"></i>
                </a>
              </BounceAnimatedBtn>
              <div>
                <span className="txt">Play Video</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection2;
