import ImgAnimateLeftToRight from "../utils/ImgAnimateLeftToRight";

const ProjectDetailFeature = () => {
  return (
    <div className="rv-project-details__features">
      <div className="row g-30 align-items-center">
        <div className="col-xl-5 col-lg-6">
          <div className="rv-project-details__features-list">
            <h5>Features</h5>

            <ul>
              <li>Quisque posuere hendrerit ultrices.</li>
              <li>Maecenas eu ante posuere, ullamcorper lectus ac.</li>
              <li>Ullamcorper erat morbi tempus, ex sed.</li>
              <li>Condimentum pharetra, dui urna euismod nisi.</li>
              <li>Praesent tristique eu diam blandit viverra.</li>
              <li>Quisque porta nisi vel viverra lobortis.</li>
            </ul>
          </div>
        </div>
        <div className="col-xl-7 col-lg-6">
          <div className="rv-project-details__features-img">
            <ImgAnimateLeftToRight
              src="/assets/img/rv-project-details-features-img.jpg"
              alt="image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailFeature;
