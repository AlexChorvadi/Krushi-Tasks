import { useState } from 'react'
import { MoviesProvider } from "./MovieContext";
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <MoviesProvider>
      <Navbar />
      <Routes>
        {/* <Navbar></Navbar> */}

        <Route path="/:search/:filter?" element={<Home />} />

        <Route
          path="/Details/:id"
          element={<MovieDetails apiKey="56dedc1e" />}
        />
      </Routes>
      <Footer />
    </MoviesProvider>

  )
}

export default App
