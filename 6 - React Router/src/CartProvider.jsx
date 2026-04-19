import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}
