import { CartItem, ShirtImages } from "../global-props";
import "./checkout-menu.css";
type CartCheckoutProps = {
  cart: CartItem[];
  onPurchase: () => void;
  onRemoveItem: (id: number) => void;
  onClose: () => void;
  isCheckoutMenuVisible: boolean;
};

//This calculates the total cost inside the cart
const calcTotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + item.price, 0);
};

export default function CartCheckout({
  cart,
  onPurchase,
  onRemoveItem,
  onClose,
  isCheckoutMenuVisible,
}: CartCheckoutProps) {
  return (
    <div
      className="modal-overlay"
      style={{ display: isCheckoutMenuVisible ? "flex" : "none" }}
    >
      <div className="cart-total">
        <div className="cart-heading">
          <p className="cart-heading-text">Checkout</p>
        </div>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="cart-item-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                className="cart-item-image"
                src={ShirtImages[item.color as keyof typeof ShirtImages]}
                alt={`${item.color} Shirt`}
              />
              <div className="cart-item-info">
                <p>
                  {`${
                    item.color.charAt(0).toUpperCase() + item.color.slice(1)
                  } Shirt`}
                </p>
                <p>{`Size: ${item.size}`}</p>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-quantity">
                <p>Qty: {item.quantity}</p>
                <button
                  className="remove-button"
                  onClick={() => onRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-purchase-section">
          <p>Total: ${calcTotal(cart).toFixed(2)}</p>
          <button className="purchase-button" onClick={onPurchase}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
