//Shirts are imported rather than references so that they can be included in the bundle on build
import whiteShirt from "../assets/tShirt.jpg";
import blackShirt from "../assets/tShirt_black.jpg";
import blueShirt from "../assets/tShirt_blue.jpg";
import redShirt from "../assets/tShirt_red.jpg";
import yellowShirt from "../assets/tShirt_yellow.jpg";

//This is where the shirt colors and sizes are defifned, as well as their cooresponding prices
export type ShirtColor = "white" | "black" | "blue" | "red" | "green";
export type ShirtSize = "XS" | "S" | "M" | "L" | "XL";
export const getSizePriceMultiplier = (size: ShirtSize) => SizePrices[size];

export type CartItem = {
  id: number;
  color: ShirtColor;
  size: ShirtSize;
  quantity: number;
  price: number;
};

export const ShirtImages = {
  red: redShirt,
  blue: blueShirt,
  white: whiteShirt,
  yellow: yellowShirt,
  black: blackShirt,
};

export const ColorPrices = {
  red: 15,
  blue: 18,
  white: 13,
  yellow: 20,
  black: 14,
};

export const SizePrices = {
  XS: 0.8,
  S: 0.9,
  M: 1,
  L: 1.1,
  XL: 1.2,
};
