import { ShirtSize } from "../global-props";
import "./size-dropdown.css";

type ShirtDropdownProps = {
  selectedSize: ShirtSize;
  onSelectSize: (size: ShirtSize) => void;
};

// This is the size dropdown component, with the sizes being defined in the global props file
// The size adjusts the price of the shirt by a set factor
export default function ShirtDropdown({
  selectedSize,
  onSelectSize,
}: ShirtDropdownProps) {
  return (
    <div className="size-selector">
      <p className="size-label">Size</p>
      <select
        className="size-label"
        value={selectedSize}
        onChange={(e) => onSelectSize(e.target.value as ShirtSize)}
      >
        <option className="size-label" value="XS">
          X-Small
        </option>
        <option className="size-label" value="S">
          Small
        </option>
        <option className="size-label" value="M">
          Medium
        </option>
        <option className="size-label" value="L">
          Large
        </option>
        <option className="size-label" value="XL">
          X-Large
        </option>
      </select>
    </div>
  );
}
