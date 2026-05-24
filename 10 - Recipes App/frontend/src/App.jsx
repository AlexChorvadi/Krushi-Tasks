import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import Footer from './components/Footer';

// FIX 1: Vite requires the VITE_ prefix to expose variables to your client application
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/recipes';

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        {/* Universal Sticky Header Navigation */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              ChefBook
            </Link>
            <Link
              to="/create"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-all"
            >
              + Add Recipe
            </Link>
          </div>
        </header>

        {/* FIX 2: Single clean router outlet wrapper. Data loading belongs inside the page components */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/create" element={<RecipeForm />} />
            <Route path="/edit/:id" element={<RecipeForm />} />
          </Routes>
        </main>

      </div>
      <Footer />
    </>
  );
}
