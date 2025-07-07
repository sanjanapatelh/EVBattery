import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import ShopCard from "../shop/ShopCard";
import { shopData } from "../../data/Data";

const TopProductSection = () => {
  return (
    <section className="rv-12-products-2 rv-section-spacing">
      <div className="container">
        <div className="rv-7-section__heading">
          <div>
            <h6 className="rv-7-section__sub-title rv-text-anime">
              Top Products
            </h6>
          </div>
          <div>
            <h2 className="rv-7-section__title rv-text-anime">
              Popular Products
            </h2>
          </div>
        </div>
        <DivAnimateYAxis>
          <div className="row rv-12-products-2__row justify-content-center g-30">
            {shopData.slice(6, 10).map((item) => (
              <div className="col-xl-3 col-lg-4 col-6 col-xxs-12" key={item.id}>
                <ShopCard
                  img={item.img}
                  name={item.name}
                  prevPrice={item.prevPrice}
                  price={item.price}
                  discount={item.discount}
                  slug={item.slug}
                  product={item}
                  style="rv-12-product--2"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="#"
              className="rv-3-def-btn rv-12-def-btn rv-12-products-2__btn mt-65"
            >
              View More
            </a>
          </div>
        </DivAnimateYAxis>
      </div>
    </section>
  );
};

export default TopProductSection;
