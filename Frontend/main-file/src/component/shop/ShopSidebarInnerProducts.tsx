import { ShopItem } from "../../types";
import ShopCard from "./ShopCard";
type Props = {
  isGridView: boolean;
  currentItems: ShopItem[];
};
const ShopSidebarInnerProducts = ({ isGridView, currentItems }: Props) => {
  return (
    <div className="rv-inner-products-container rv-12-product--2">
      <div className="row g-30 row-cols-xl-3 row-cols-md-2 row-cols-2 row-cols-xxs-1">
        {currentItems.map((item) => (
          <div
            className={`col ${isGridView ? "" : "list-view-on"}`}
            key={item.id}
          >
            <ShopCard
              img={item.img}
              name={item.name}
              prevPrice={item.prevPrice}
              price={item.price}
              discount={item.discount}
              slug={item.slug}
              product={item}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopSidebarInnerProducts;
