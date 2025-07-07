import { categoryData } from "../../data/Data";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const CategorySection = () => {
  return (
    <section className="rv-12-categories rv-section-spacing">
      <div className="container">
        <div className="rv-7-section__heading">
          <div>
            <h6 className="rv-7-section__sub-title rv-text-anime">
              Shop by Category
            </h6>
          </div>
          <div>
            <h2 className="rv-7-section__title rv-text-anime">
              Popular Tea Category.
            </h2>
          </div>
        </div>

        <DivAnimateYAxis className="row rv-12-categories__row">
          {categoryData.map((item) => (
            <div className="col-lg-3 col-6 col-xxs-12" key={item.id}>
              <div
                className={`rv-12-category ${
                  item.id === categoryData.length ? "rv-12-category--last" : ""
                }`}
              >
                <div className="rv-12-category__img">
                  <img src={item.mainImg} alt="Category Sample" />
                </div>
                <div className="rv-12-category__txt">
                  <h6 className="rv-12-category__title">
                    <a href="#">{item.category}</a>
                  </h6>
                  <p className="rv-12-category__descr">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </DivAnimateYAxis>
        <a href="#" className="rv-3-def-btn rv-12-def-btn">
          View All Category
        </a>
      </div>
    </section>
  );
};

export default CategorySection;
