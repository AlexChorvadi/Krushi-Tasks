import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../App'; 

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      // const response = await axios.get(API_BASE_URL);
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      // Axios stores the parsed JSON body data directly inside response.data
      setRecipes(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Axios fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      fetchRecipes();
    } catch (err) {
      console.error('Axios delete error:', err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white rounded-2xl border border-slate-100 p-6 h-44 animate-pulse space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-400 text-sm">No culinary profiles match your selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.map((recipe) => (
            <div 
              key={recipe._id} 
              onClick={() => navigate(`/recipe/${recipe._id}`)}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    recipe.isVegetarian ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {recipe.isVegetarian ? '🥬 Veg' : '🥩 Non-Veg'}
                  </span>
                  <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-md">
                    {recipe.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-500 transition-colors mb-1">
                  {recipe.title}
                </h3>
                
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                  Ingredients: {recipe.ingredients}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-4">
                <span className="text-xs text-slate-500 font-medium">⏱️ {recipe.cookingTime} mins</span>
                
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => navigate(`/edit/${recipe._id}`)} 
                    className="text-xs font-semibold text-slate-600 hover:text-orange-500 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, recipe._id)} 
                    className="text-xs font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
