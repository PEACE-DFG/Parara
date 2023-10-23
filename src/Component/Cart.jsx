import React, { useState, useEffect } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Retrieve the current cart items from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const validCart = cart.map((item) => {
      const quantity = typeof item.quantity === "number" ? item.quantity : 1;
      const price = typeof item.price === "number" ? item.price : 0;
      return { ...item, quantity, price };
    });
    setCartItems(validCart);

    // Calculate the total price
    const total = validCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, []);

  const incrementTotalPrice = (amount) => {
    setTotalPrice(totalPrice + amount);
  };

  const decrementTotalPrice = (amount) => {
    setTotalPrice(totalPrice - amount);
  };

  const incrementQuantity = (item) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
      }
      return cartItem;
    });
    setCartItems(updatedCart);
    incrementTotalPrice(item.price);
  };

  const decrementQuantity = (item) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        };
      }
      return cartItem;
    });
    setCartItems(updatedCart);
    decrementTotalPrice(item.price);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>
                <div>
                  <img src={item.images[0]} alt={item.title} style={{ width: "50px" }} />
                  {item.title}
                </div>
              </td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => decrementQuantity(item)}>-</button>
                {item.quantity}
                <button onClick={() => incrementQuantity(item)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Price: ${totalPrice}</p>
    
    </div>
  );
}

export default Cart;
