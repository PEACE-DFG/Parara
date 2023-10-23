import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const [product, setProduct] = useState({});
  const [isProductAdded, setIsProductAdded] = useState(false);
  const { productId } = useParams();

  function fetchProduct() {
    axios
      .get(`https://dummyjson.com/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const isProductAvailable = Object.keys(product).length > 0;

  const addToCart = () => {
    // Retrieve the current cart items from localStorage or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const isProductInCart = existingCart.some((item) => item.id === product.id);

    if (!isProductInCart) {
      // Add the selected product to the cart
      existingCart.push(product);

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));

      setIsProductAdded(true); // Set the state to indicate that the product has been added

      // Delay the refresh after 1.5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      setIsProductAdded("alreadyAdded"); // Set the state to indicate that the product is already in the cart
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white" }} className="mt-2">
        Details
      </h2>
      {isProductAvailable ? (
        <div className="centered">
          <div>
            <h2>Product</h2>
            <img
              src={product.images[0]}
              style={{ width: "200px" }}
              className="img-fluid"
              alt=""
            />
            <p>
              <h4 className="mt-2">Related Products:</h4>
              {product.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="m-3 img-fluid"
                  style={{ width: "100px" }}
                  alt=""
                />
              ))}
            </p>
          </div>
          <div>
            <div style={{ fontSize: "25px" }} className="mt-3">
              {"Brand:" + " " + product.brand}
            </div>
            <div style={{ fontSize: "15px" }} className="mt-3">
              {"Price:" + " " + "$" + product.price}
            </div>
            <div style={{ fontSize: "15px" }} className="mt-3">
              {"Description:" + " " + product.description}
            </div>
          </div>
          <div>
            <button onClick={addToCart}>Add to cart</button>
            {isProductAdded === true ? (
              <p style={{ color: "green" }}>Product has been added to the cart</p>
            ) : isProductAdded === "alreadyAdded" ? (
              <p style={{ color: "red" }}>Product is already in the cart</p>
            ) : null}
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default SingleProduct;
