import {
  ShirtColor,
  ShirtImages,
  ColorPrices,
  ShirtSize,
  getSizePriceMultiplier,
} from "../global-props";
import "./color-selector.css";

type ColorSelectorProps = {
  setSelectedColor: (color: ShirtColor) => void;
  selectedSize: ShirtSize;
};

//This component creates a list of available colors from the global props
// It displays an image of the shirt, the cooresponding color text, and the price,
// which adjusts based on the size.
export default function ColorSelector({
  setSelectedColor,
  selectedSize,
}: ColorSelectorProps) {
  return (
    <div className="shirt-color-selector">
      {Object.entries(ShirtImages).map(([color, image]) => (
        <div
          key={color}
          className="shirt-option"
          onClick={() => setSelectedColor(color as ShirtColor)}
        >
          <img src={image} alt={`${color} Shirt`} className="shirt-image" />
          <div className="shirt-info">
            <div className="shirt-title">
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </div>
            <div className="shirt-price">
              $
              {(
                ColorPrices[color as keyof typeof ColorPrices] *
                getSizePriceMultiplier(selectedSize)
              ).toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
