import React, { useState, useEffect } from "react";

interface CustomRangeSliderProps {
  minValue: number;
  maxValue: number;
  initialMinValue: number;
  initialMaxValue: number;
  onSliderChange: (values: { sliderOne: number; sliderTwo: number }) => void;
}

const CustomRangeSlider: React.FC<CustomRangeSliderProps> = ({
  minValue,
  maxValue,
  initialMinValue,
  initialMaxValue,
  onSliderChange,
}) => {
  const [sliderOne, setSliderOne] = useState<number>(initialMinValue);
  const [sliderTwo, setSliderTwo] = useState<number>(initialMaxValue);
  const [minGap] = useState<number>(0);
  const sliderMaxValue: number = maxValue;

  useEffect(() => {
    onSliderChange({ sliderOne, sliderTwo });
    fillColor();
  }, [sliderOne, sliderTwo]);

  const slideOne = (value: number) => {
    if (sliderTwo - value <= minGap) {
      setSliderOne(sliderTwo - minGap);
    } else {
      setSliderOne(value);
    }
    fillColor();
  };

  const slideTwo = (value: number) => {
    if (value - sliderOne <= minGap) {
      setSliderTwo(sliderOne + minGap);
    } else {
      setSliderTwo(value);
    }
    fillColor();
  };

  const fillColor = () => {
    const percent1 = (sliderOne / sliderMaxValue) * 100 - 8;
    const percent2 = (sliderTwo / sliderMaxValue) * 100 - 5;
    const sliderTrack = document.querySelector(
      ".slider-track"
    ) as HTMLDivElement;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #509e0f ${percent1}% , #509e0f ${percent2}%, #dadae5 ${percent2}%)`;
  };

  return (
    <div className="wrapper">
      <div className="rv-container">
        <div className="slider-track"></div>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={sliderOne}
          id="slider-1"
          onChange={(e) => slideOne(parseFloat(e.target.value))}
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={sliderTwo}
          id="slider-2"
          onChange={(e) => slideTwo(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default CustomRangeSlider;
