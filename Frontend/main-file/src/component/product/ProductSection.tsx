import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import { shopData } from "../../data/Data";
import ShopCard from "../shop/ShopCard";

const ProductSection = () => {
  return (
    <section className="rv-12-products rv-section-spacing">
      <div className="container">
        <div className="rv-7-section__heading">
          <div>
            <h6 className="rv-7-section__sub-title rv-text-anime">
              Our Products
            </h6>
          </div>
          <div>
            <h2 className="rv-7-section__title rv-text-anime">
              Our Best Products.
            </h2>
          </div>
        </div>
        <DivAnimateYAxis>
          <Swiper
            className="rv-7-products__slider"
            spaceBetween={15}
            slidesPerView={4}
            navigation={{
              prevEl: "#rv-7-products__slider-nav .prev",
              nextEl: "#rv-7-products__slider-nav .next",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              480: {
                centeredSlides: true,
                loop: true,
                slidesPerView: 1.6,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2.3,
                centeredSlides: true,
                loop: true,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1200: {
                spaceBetween: 20,
                slidesPerView: 4,
              },
              1400: {
                spaceBetween: 30,
              },
            }}
            modules={[Navigation]}
          >
            {shopData.slice(0, 5).map((item) => (
              <SwiperSlide key={item.id}>
                <ShopCard
                  img={item.img}
                  name={item.name}
                  prevPrice={item.prevPrice}
                  price={item.price}
                  discount={item.discount}
                  slug={item.slug}
                  product={item}
                />
              </SwiperSlide>
            ))}

            <div
              className="rv-1-slider-nav rv-12-slider-nav"
              id="rv-7-products__slider-nav"
            >
              <button className="prev">
                <i className="fa-regular fa-arrow-left"></i>
              </button>
              <button className="next">
                <i className="fa-regular fa-arrow-right"></i>
              </button>
            </div>
          </Swiper>
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default ProductSection;
