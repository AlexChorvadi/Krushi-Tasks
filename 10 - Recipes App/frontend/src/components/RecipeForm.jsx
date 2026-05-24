import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../App'; 

export default function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    cookingTime: '',
    category: '',
    isVegetarian: false,
  });

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      axios.get(`${API_BASE_URL}/byId/${id}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            title: data.title || '',
            ingredients: data.ingredients || '',
            cookingTime: data.cookingTime || '',
            category: data.category || '',
            isVegetarian: !!data.isVegetarian,
          });
        })
        .catch((err) => console.error('Axios form load error:', err))
        .finally(() => setLoading(false));
    }
    else{
      setFormData({
        title: '',
        ingredients: '',
        cookingTime: '',
        category: '',
        isVegetarian: false,
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      cookingTime: String(formData.cookingTime), 
    };

    try {
      if (isEdit) {
        // Axios methods accept data payload directly as the second argument without JSON.stringify
        await axios.put(`${API_BASE_URL}/update/${id}`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/create`, payload);
      }
      navigate('/'); 
    } catch (err) {
      console.error('Axios submit error:', err);
      alert('Error updating data profile. Check console inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-md p-12 mx-auto text-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 text-sm">Fetching recipe data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 w-full max-w-md p-6 mx-auto">
      <h2 className="text-xl font-bold text-slate-900 mb-6">{isEdit ? 'Edit Recipe' : 'Create New Recipe'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
          <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ingredients</label>
          <textarea required value={formData.ingredients} onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })} className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm h-24 resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Time (mins)</label>
            <input type="number" required value={formData.cookingTime} onChange={(e) => setFormData({ ...formData, cookingTime: e.target.value })} className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
            <input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm" />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input type="checkbox" id="isVegetarian" checked={formData.isVegetarian} onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })} className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" />
          <label htmlFor="isVegetarian" className="text-sm font-medium text-slate-700 select-none">This recipe is Vegetarian</label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t mt-6">
          <Link to="/" className="px-4 py-2 border text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50">Cancel</Link>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update Recipe' : 'Save Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
}
