// ShopPriceFilter.tsx

import { useState } from "react";
import CustomRangeSlider from "../utils/CustomRangeSlider";
import { useAppDispatch } from "../../redux/hooks";
import { setPriceRange } from "../../redux/features/shopSidebarSlice";

interface SliderValues {
  sliderOne: number;
  sliderTwo: number;
}

const ShopPriceFilter = () => {
  const initialMinValue = 100;
  const initialMaxValue = 550;
  const dispatch = useAppDispatch();

  const [sliderValues, setSliderValues] = useState<SliderValues>({
    sliderOne: initialMinValue,
    sliderTwo: initialMaxValue,
  });

  const handleSliderChange = (values: SliderValues) => {
    setSliderValues(values);
    dispatch(setPriceRange({ min: values.sliderOne, max: values.sliderTwo }));
  };

  return (
    <section className="rv-blog-details-right rv-shop-sidebar-single-area rv-price-filter">
      <h3 className="rv-blog-details-right__title">Filter Price</h3>
      <div className="slider-keypress"></div>
      <div className="filtered-price d-flex align-items-center">
        <CustomRangeSlider
          minValue={100}
          maxValue={1000}
          initialMinValue={initialMinValue}
          initialMaxValue={initialMaxValue}
          onSliderChange={handleSliderChange}
        />
        <div className="filter-info">
          <h6 className="filtered-price__title">price:</h6>
          <div className="filtered-price__number">
            <span className="range-start">
              $
              <span className="input-with-keypress-0">
                {sliderValues.sliderOne}
              </span>
            </span>
            <span className="hyphen">-</span>
            <span className="range-end">
              $
              <span className="input-with-keypress-1">
                {sliderValues.sliderTwo}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPriceFilter;
