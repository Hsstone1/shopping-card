import React, { useState } from "react";
import "./shopping-card.css";
import SizeDropdown from "../SizeDropdown/SizeDropdown";
import ColorSelector from "../ColorSelector/ColorSelector";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import Snackbar from "@mui/material/Snackbar";

import {
  ShirtColor,
  ShirtSize,
  ShirtImages,
  ColorPrices,
  SizePrices,
  CartItem,
} from "../global-props";
import CheckoutMenu from "../CheckoutMenu/CheckoutMenu";

export default function ShoppingCard() {
  const [selectedColor, setSelectedColor] = useState<ShirtColor>("white");
  const [selectedSize, setSelectedSize] = useState<ShirtSize>("M");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutMenuVisible, setIsCheckoutMenuVisible] =
    useState<boolean>(false);

  //The alert message is used in a red snackbar, used for errors or alerts
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  //The snackbar message brings up a blue snackbar, used for status messages
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const shirtColorKey = selectedColor as keyof typeof ShirtImages;

  function handleAddToCart(event: any): void {
    // This adds the current selected items to the cart
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems];

      // Adds the item to the cart, assigning a unique id to each item
      updatedCartItems.push({
        id: updatedCartItems.length,
        color: selectedColor,
        size: selectedSize,
        quantity: selectedQuantity,
        price:
          selectedQuantity *
          ColorPrices[shirtColorKey] *
          SizePrices[selectedSize],
      });
      setSnackbarMessage("Item Added to Cart!");

      return updatedCartItems;
    });
  }

  // This is called once the purchase button in the menu is clicked.
  // It clears the cart and total amount, and displays a snackbar message
  function handlePurchase(): void {
    setCartItems([]);
    setIsCheckoutMenuVisible(false);
    setSnackbarMessage("Purchase Successful!");
  }

  // This is called when the remove button is clicked on an item in the cart
  // It removes the item from the cart at its respective index
  function handleRemoveItem(id: number): void {
    setSnackbarMessage("Item Removed from Cart!");
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((item) => item.id !== id);
      return updatedCartItems;
    });
  }

  // This is called when the checkout button is clicked, assuming there are items in the cart
  function handleCartCheckout(event: any): void {
    if (cartItems.length === 0) {
      setAlertMessage("Please add items to your cart before checking out!");
      return;
    }
    setIsCheckoutMenuVisible(true);
  }

  return (
    <div className="shopping-card">
      <img
        className="shopping-card-image"
        src={ShirtImages[shirtColorKey]}
        alt={`${selectedColor} Shirt`}
      />

      <div className="shopping-card-content">
        {isCheckoutMenuVisible && (
          <CheckoutMenu
            cart={cartItems}
            onPurchase={handlePurchase}
            onRemoveItem={handleRemoveItem}
            onClose={() => setIsCheckoutMenuVisible(false)}
            isCheckoutMenuVisible={isCheckoutMenuVisible}
          />
        )}

        <h1>Shirt Selection</h1>

        <div className="size-quantity-wrapper">
          <SizeDropdown
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />
          <QuantitySelector
            selectedQuantity={selectedQuantity}
            onSelectQuantity={setSelectedQuantity}
          />
        </div>
        <ColorSelector
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
        />

        <button className="add-to-cart-button" onClick={handleAddToCart}>
          {`Add to Cart ($${(
            selectedQuantity *
            ColorPrices[shirtColorKey] *
            SizePrices[selectedSize]
          ).toFixed(2)})`}
        </button>

        {/* This is the checkout menu button */}
        <button className="cart-total" onClick={handleCartCheckout}>
          {`Checkout (${cartItems.length})`}
        </button>
      </div>

      {/* This is the status message snackbar, with a light blue background */}
      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={1000}
        onClose={() => setSnackbarMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={snackbarMessage}
        ContentProps={{ style: { backgroundColor: "#5496ff", color: "white" } }}
      />

      {/* This is the error message snackbar, with a red background */}

      <Snackbar
        open={Boolean(alertMessage)}
        autoHideDuration={1000}
        onClose={() => setAlertMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={alertMessage}
        ContentProps={{ style: { backgroundColor: "#ff3333", color: "white" } }}
      />
    </div>
  );
}
