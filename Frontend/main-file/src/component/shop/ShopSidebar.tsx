import ShopCategory from "./ShopCategory";
import ShopColorFilter from "./ShopColorFilter";
import ShopPriceFilter from "./ShopPriceFilter";
type Props = {
  uniqueCategories: string[];
  selectedCategories: string[];
  handleCategoryClick: (category: string) => void;
  uniqueColors: string[];
  selectedColors: string[];
  handleColorClick: (color: string) => void;
  colorCounts: Record<string, number>;
};
const ShopSidebar = ({
  uniqueCategories,
  selectedCategories,
  handleCategoryClick,
  uniqueColors,
  selectedColors,
  handleColorClick,
  colorCounts,
}: Props) => {
  return (
    <div className="rv-shop-sidebar">
      <ShopCategory
        uniqueCategories={uniqueCategories}
        selectedCategories={selectedCategories}
        handleCategoryClick={handleCategoryClick}
      />

      <ShopColorFilter
        uniqueColors={uniqueColors}
        selectedColors={selectedColors}
        handleColorClick={handleColorClick}
        colorCounts={colorCounts}
      />

      <ShopPriceFilter />
    </div>
  );
};

export default ShopSidebar;
