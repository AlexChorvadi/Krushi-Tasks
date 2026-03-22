import { useReducer, useState } from 'react'
import './App.css'
import ProductList from './components/ProductList/ProductList'
import Navbar from './components/Navbar/navbar'
import ProductModal from './components/ProductModal/ProductModal'
import ModalPortal from './components/Modal'
import FavModal from './components/ProductModal/FavModal'

const initialState = {
  cart: [],
  fav: []
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'ADD_TO_FAV':
      return {
        ...state,
        fav: [...state.fav, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    case 'REMOVE_FROM_FAV':
      return {
        ...state,
        fav: state.fav.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavModalOpen, setIsFavModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenFavModal = () => setIsFavModalOpen(true);
  const handleCloseFavModal = () => setIsFavModalOpen(false);

  return (
    <>
      <Navbar state={state} onOpenModal={handleOpenModal} onOpenFavModal={handleOpenFavModal} />

      <ProductList dispatch={dispatch} state={state} />

      <ModalPortal open={isModalOpen} close={handleCloseModal} Header="Your Cart">
        <ProductModal dispatch={dispatch} state={state} />
      </ModalPortal>

      <ModalPortal open={isFavModalOpen} close={handleCloseFavModal} Header="Your Favourites">
        <FavModal state={state} dispatch={dispatch} />
      </ModalPortal>
    </>
  )
}

export default App
