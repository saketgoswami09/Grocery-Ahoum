import { type Category, ProductCategory } from "@/types";
import fruitBasket from "@/assets/categories/fruitBasket.svg";
import oils from "@/assets/categories/oils.svg";
import meat from "@/assets/categories/meat.svg";
import dairy from "@/assets/categories/Dairy & Eggs.svg";
import baverages from "@/assets/categories/Beverages.svg";
export const categoriesImages = {
  fruitBasket,
  oils,
  meat,
  dairy,
  baverages,
};
export const categories: Category[] = [
  {
    id: ProductCategory.FRESH_FRUITS,
    name: "Fresh Fruits & Vegetables",
    image: categoriesImages.fruitBasket,
    color: "#E6F2EA",
    borderColor: "#53B175",
  },
  {
    id: ProductCategory.COOKING_OIL,
    name: "Cooking Oil & Ghee",
    image: categoriesImages.oils,
    color: "#FEF0DE",
    borderColor: "#F8A44C",
  },
  {
    id: ProductCategory.MEAT_FISH,
    name: "Meat & Fish",
    image: categoriesImages.meat,
    color: "#FDE8E4",
    borderColor: "#F7A593",
  },
  {
    id: ProductCategory.BAKERY,
    name: "Bakery & Snacks",
    image: categoriesImages.baverages,
    color: "#F4EBF7",
    borderColor: "#D3B0E0",
  },
  {
    id: ProductCategory.DAIRY_EGGS,
    name: "Dairy & Eggs",
    image: categoriesImages.dairy,
    color: "#FFF6E3",
    borderColor: "#FFC84E",
  },
  {
    id: ProductCategory.BEVERAGES,
    name: "Beverages",
    image: "/images/cat-beverages.png",
    color: "#D4F0FF",
    borderColor: "#56B4E9",
  },
  {
    id: ProductCategory.FRESH_VEGETABLES,
    name: "Fresh Vegetables",
    image: "/images/cat-vegetables.png",
    color: "#E6F2EA",
    borderColor: "#53B175",
  },
  {
    id: ProductCategory.SNACKS,
    name: "Snacks",
    image: "/images/cat-snacks.png",
    color: "#FEF0DE",
    borderColor: "#F8A44C",
  },
];
