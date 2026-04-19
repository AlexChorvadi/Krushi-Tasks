import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import ProductList from "./components/ProductList/ProductList";
import Navbar from "./components/Navbar/navbar";
import ProductModal from "./components/ProductModal/ProductModal";
import ModalPortal from "./components/Modal";
import FavModal from "./components/ProductModal/FavModal";
import Cart from "./components/Cart/Cart";

import { CartProvider } from "./CartContext";
import Footer from "./components/footer";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavModalOpen, setIsFavModalOpen] = useState(false);

  return (
    <CartProvider>
      <Navbar
        onOpenModal={() => setIsModalOpen(true)}
        onOpenFavModal={() => setIsFavModalOpen(true)}
      />
      {/* ✅ SINGLE Routes block */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <ModalPortal open={isModalOpen} close={() => setIsModalOpen(false)} Header="Your Cart">
        <ProductModal />
      </ModalPortal>

      <ModalPortal open={isFavModalOpen} close={() => setIsFavModalOpen(false)} Header="Your Favourites">
        <FavModal />
      </ModalPortal>
      <Footer />
    </CartProvider>
  );
}

export default App;
