import { productDetailsImage } from "../../data/Data";
import { useState } from "react";
import { EffectFade, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductDetailsImageSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div className="rv-product-details__imgs">
      <Swiper
        className="rv-product-details-img-slider-1"
        id="rv-product-details-img-slider-1"
        autoHeight={true}
        slidesPerView={"auto"}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        breakpoints={{
          0: {
            direction: "horizontal",
          },
          576: {
            direction: "vertical",
          },
        }}
      >
        {productDetailsImage[0].thumbs.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="rv-product-details__thumb">
              {" "}
              <img src={image} alt={`Product Image ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className="rv-product-details-img-slider-2"
        id="rv-product-details-img-slider-2"
        slidesPerView={1}
        loop={true}
        effect="fade"
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, EffectFade]}
      >
        {productDetailsImage[0].main.map((image, index) => (
          <SwiperSlide className="rv-product-details__img" key={index}>
            <img src={image} alt={`Product Image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductDetailsImageSlider;
