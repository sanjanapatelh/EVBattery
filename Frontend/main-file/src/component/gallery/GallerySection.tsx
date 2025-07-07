import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const GallerySection = () => {
  return (
    <DivAnimateYAxis className="rv-12-gallery" position={30}>
      <div className="row g-4 row-cols-xl-5 row-cols-md-3 row-cols-2 row-cols-xxs-1 justify-content-center">
        <div className="col">
          <div className="rv-5-gallery__img rv-12-gallery__img">
            <button type="button">
              <i className="fa-brands fa-instagram"></i>
            </button>
            <img src="assets/img/rv-12-gallery-1.jpg" alt="Gallery-1" />
          </div>
        </div>
        <div className="col">
          <div className="rv-5-gallery__img rv-12-gallery__img">
            <button type="button">
              <i className="fa-brands fa-instagram"></i>
            </button>
            <img src="assets/img/rv-12-gallery-2.jpg" alt="Gallery-1" />
          </div>
        </div>
        <div className="col">
          <div className="rv-5-gallery__img rv-12-gallery__img">
            <button type="button">
              <i className="fa-brands fa-instagram"></i>
            </button>
            <img src="assets/img/rv-12-gallery-3.jpg" alt="Gallery-1" />
          </div>
        </div>
        <div className="col">
          <div className="rv-5-gallery__img rv-12-gallery__img">
            <button type="button">
              <i className="fa-brands fa-instagram"></i>
            </button>
            <img src="assets/img/rv-12-gallery-4.jpg" alt="Gallery-1" />
          </div>
        </div>
        <div className="col">
          <div className="rv-5-gallery__img rv-12-gallery__img">
            <button type="button">
              <i className="fa-brands fa-instagram"></i>
            </button>
            <img src="assets/img/rv-12-gallery-5.jpg" alt="Gallery-1" />
          </div>
        </div>
      </div>
    </DivAnimateYAxis>
  );
};

export default GallerySection;
