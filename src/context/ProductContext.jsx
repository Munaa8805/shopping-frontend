import { createContext, useContext, useEffect, useState } from "react";
import { products as initialProducts } from "../data/products";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(initialProducts);
  }, []);
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
