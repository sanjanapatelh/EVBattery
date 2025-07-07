type Props = {
  uniqueColors: string[];
  selectedColors: string[];
  handleColorClick: (color: string) => void;
  colorCounts: Record<string, number>;
};
const ShopColorFilter = ({
  uniqueColors,
  selectedColors,
  handleColorClick,
  colorCounts,
}: Props) => {
  const isColorSelected = (color: string) => {
    return selectedColors.includes(color);
  };

  const handleClick = (color: string) => {
    // Toggle the color selection
    handleColorClick(color);
  };

  return (
    <section className="rv-blog-details-right rv-shop-sidebar-single-area rv-color-variants-area">
      <h3 className="rv-blog-details-right__title">Filter Colour</h3>
      <ul className="color-variants">
        {uniqueColors.map((color, index) => (
          <li
            className={`color-variant ${
              isColorSelected(color) ? " active" : ""
            }`}
            key={index}
          >
            <a
              className={color.toLocaleLowerCase()}
              role="button"
              onClick={() => handleClick(color)}
            >
              {color}{" "}
              <span className="amount">({colorCounts[color] || 0})</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ShopColorFilter;
