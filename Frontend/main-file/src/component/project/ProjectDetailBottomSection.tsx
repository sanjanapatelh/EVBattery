import ImgAnimateLeftToRight from "../utils/ImgAnimateLeftToRight";
const ProjectDetailBottomSection = () => {
  const images = [
    "/assets/img/rv-1-blog-1.jpg",
    "/assets/img/rv-1-blog-2.jpg",
    "/assets/img/rv-1-blog-3.jpg",
  ];
  return (
    <>
      <div className="rv-project-details__bottom-txt">
        <h3 className="rv-service-details__title">Project Challenges</h3>

        <p className="rv-service-details__descr">
          Maecenas egestas odio magna, a porttitor nulla vulputate nec. Vivamus
          aliquet mi libero, sed iaculis odio faucibus sit amet. Nam eget quam
          semper, lacinia diam at, malesuada urna. Nullam gravida maximus
          dignissim. In sit amet leo blandit nibh tempor mattis. Praesent at
          sapien ante. Donec rutrum ligula vitae tellus posuere, et pellentesque
          est placerat. Nullam bibendum varius metus id vulputate. Ut
          pellentesque commodo convallis. Praesent cursus dignissim efficitur.
          Nunc vitae consectetur massa, non imperdiet dui. Vestibulum eu libero
          dictum, sodales arcu ac, tempor arcu.
        </p>
        <p className="rv-service-details__descr">
          Donec ac turpis ac nulla tempor laoreet ut et risus. In posuere metus
          nec lacus gravida, vel malesuada quam semper. Integer sodales lacinia
          tortor, sed faucibus massa porttitor id. Cras at ante nulla. Donec
          maximus purus et pulvinar fringilla. Vivamus vestibulum ipsum et
          placerat faucibus. Praesent blandit suscipit justo, quis lacinia lacus
          dignissim vel. Nam euismod commodo elit, ut porttitor odio tempus a.
          Phasellus interdum urna quam, et ultrices orci ultrices in.
          Pellentesque gravida in risus sit amet tincidunt.
        </p>
      </div>

      <div className="rv-project-details__bottom-imgs">
        <div className="row justify-content-center row-cols-lg-3 row-cols-sm-2 row-cols-1 g-30">
          {images.map((image, index) => (
            <div className="col" key={index}>
              <div className="rv-project-details__bottom-img">
                <ImgAnimateLeftToRight src={image} alt="image" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectDetailBottomSection;
