import "./quantity-selector.css";

type QuantitySelectorProps = {
  selectedQuantity: number;
  onSelectQuantity: (quantity: number) => void;
};

// This is the quantity selector component
// It has a plus and minus button, as well as the quantity amount
// The minimum quantity is 1
export default function QuantitySelector({
  selectedQuantity,
  onSelectQuantity,
}: QuantitySelectorProps) {
  return (
    <div className="quantity-selector">
      <button
        className="quantity-button"
        onClick={() => onSelectQuantity(selectedQuantity + 1)}
      >
        +
      </button>
      <p className="quantity-text">{selectedQuantity}</p>

      <button
        className="quantity-button"
        onClick={() => {
          if (selectedQuantity > 1) {
            onSelectQuantity(selectedQuantity - 1);
          }
        }}
      >
        -
      </button>
    </div>
  );
}
