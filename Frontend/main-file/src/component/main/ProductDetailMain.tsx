import { useState } from "react";
import ProductDetailsImageSlider from "../product/ProductDetailsImageSlider";
import ProductDetailTop from "../product/ProductDetailTop";
import ProductDescription from "../product/ProductDescription";
import ProductReview from "../product/ProductReview";
import { ShopItem } from "../../types";

type Props = {
  item: ShopItem;
};

const ProductDetailMain = ({ item }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("desc");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <section className="rv-product-details rv-section-spacing">
      <div className="container">
        <div className="row g-0 align-items-start justify-content-center">
          <div className="col-lg-6 col-12 col-xxs-12">
            <ProductDetailsImageSlider />
          </div>

          <div className="col-lg-6">
            <ProductDetailTop item={item} />
          </div>

          <div className="col-12">
            <div className="rv-product-details__bottom-txt">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "desc" ? "active" : ""
                    }`}
                    id="descr-tab"
                    onClick={() => handleTabClick("desc")}
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "review" ? "active" : ""
                    }`}
                    id="review-tab"
                    onClick={() => handleTabClick("review")}
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className={`tab-pane fade ${
                    activeTab === "desc" ? "show active" : ""
                  }`}
                  id="descr-tab-pane"
                >
                  <ProductDescription />
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "review" ? "show active" : ""
                  }`}
                  id="review-tab-pane"
                >
                  <ProductReview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailMain;
