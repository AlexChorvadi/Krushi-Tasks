import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../App'; 

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/byId/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error('Axios details fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you completely sure you want to permanently delete this recipe?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      navigate('/'); 
    } catch (err) {
      console.error('Axios delete execution error:', err);
      alert('Failed to delete the profile database row.');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-2xl p-16 mx-auto text-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400 text-sm">Loading full preparation profile...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-2xl p-12 mx-auto text-center">
        <p className="text-slate-500 text-sm mb-4">The requested recipe could not be found or has been removed.</p>
        <Link to="/" className="text-sm font-semibold text-orange-500 hover:text-orange-600">Return to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <Link to="/" className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1">
          ← Back to Recipes
        </Link>
        
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button 
            onClick={() => navigate(`/edit/${id}`)}
            className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            Edit Profile
          </button>
          <button 
            onClick={handleDelete}
            className="text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          recipe.isVegetarian ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {recipe.isVegetarian ? '🥬 Vegetarian' : '🥩 Non-Vegetarian'}
        </span>
        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
          {recipe.category}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 leading-tight">
        {recipe.title}
      </h2>
      
      <div className="text-sm text-slate-500 font-medium mb-6 flex items-center gap-1.5">
        ⏱️ Ready for preparation in <span className="text-slate-800 font-bold">{recipe.cookingTime} minutes</span>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ingredients Needed</h4>
          <p className="text-sm sm:text-base text-slate-700 bg-slate-50 p-4 rounded-xl whitespace-pre-line leading-relaxed border border-slate-100">
            {recipe.ingredients}
          </p>
        </div>
      </div>
    </div>
  );
}
