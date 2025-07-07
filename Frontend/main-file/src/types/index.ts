export interface ShopItem {
  id: number;
  img: string;
  name: string;
  prevPrice: number;
  price: number;
  quantity: number;
  discount?: boolean;
  slug: string;
  popularity: number;
  rating: number;
  category: string;
  color: string;
}
