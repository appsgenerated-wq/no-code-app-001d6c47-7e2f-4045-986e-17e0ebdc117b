import React, { useEffect, useState } from 'react';
import { UserCircleIcon, ArrowRightOnRectangleIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, tomatoes, onLogout, loadTomatoes, createTomato, updateTomato, deleteTomato }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTomato, setEditingTomato] = useState(null);
  const [formData, setFormData] = useState({ name: '', variety: '', description: '', color: 'Red', rating: 3 });

  useEffect(() => {
    loadTomatoes();
  }, []);

  useEffect(() => {
    if (editingTomato) {
      setFormData({
        name: editingTomato.name || '',
        variety: editingTomato.variety || '',
        description: editingTomato.description || '',
        color: editingTomato.color || 'Red',
        rating: editingTomato.rating || 3,
      });
      setIsFormOpen(true);
    } else {
      resetForm();
    }
  }, [editingTomato]);

  const resetForm = () => {
    setFormData({ name: '', variety: '', description: '', color: 'Red', rating: 3 });
    setEditingTomato(null);
  };

  const handleFormToggle = () => {
    setIsFormOpen(!isFormOpen);
    setEditingTomato(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTomato) {
      await updateTomato(editingTomato.id, { ...formData, rating: Number(formData.rating) });
    } else {
      await createTomato({ ...formData, rating: Number(formData.rating) });
    }
    resetForm();
    setIsFormOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600" alt="TomatoTracker" />
                <span className="ml-2 text-xl font-bold text-gray-900">TomatoTracker</span>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm text-gray-700 hidden sm:block">Welcome, {user.name}!</span>
              <button
                onClick={onLogout}
                className="flex items-center rounded-md p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Tomato Collection</h1>
            <button
              onClick={handleFormToggle}
              className="mt-4 sm:mt-0 flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              {isFormOpen ? 'Cancel' : 'Add New Tomato'}
            </button>
          </div>

          {isFormOpen && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{editingTomato ? 'Edit Tomato' : 'New Tomato Details'}</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                </div>
                 <div>
                  <label htmlFor="variety" className="block text-sm font-medium text-gray-700">Variety</label>
                  <input type="text" name="variety" id="variety" value={formData.variety} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description / Notes</label>
                  <textarea name="description" id="description" rows={3} value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
                </div>
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                  <select id="color" name="color" value={formData.color} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm">
                    {['Red', 'Yellow', 'Green', 'Purple', 'Orange', 'Other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                  <input type="number" name="rating" id="rating" min="1" max="5" value={formData.rating} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-x-4">
                  <button type="button" onClick={() => { setIsFormOpen(false); setEditingTomato(null); }} className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">{editingTomato ? 'Save Changes' : 'Add Tomato'}</button>
                </div>
              </form>
            </div>
          )}

          {tomatoes.length === 0 && !isFormOpen ? (
            <div className="text-center bg-white p-12 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">No tomatoes yet!</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first tomato variety.</p>
              <div className="mt-6">
                <button onClick={() => setIsFormOpen(true)} type="button" className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                  <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                  Add First Tomato
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tomatoes.map(tomato => (
                <div key={tomato.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    {tomato.image && tomato.image.thumbnail ? 
                     <img src={tomato.image.thumbnail} alt={tomato.name} className="h-48 w-full object-cover" /> :
                     <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div> }
                     <div className="p-6 flex-grow flex flex-col">
                         <div className="flex justify-between items-start">
                             <h3 className="text-xl font-semibold text-gray-900">{tomato.name}</h3>
                             <div className="flex-shrink-0 ml-4">
                                 <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800`}>{tomato.color}</span>
                             </div>
                         </div>
                         <p className="text-sm text-gray-600 mt-1">{tomato.variety}</p>
                         <p className="text-sm text-gray-500 mt-2 flex-grow">{tomato.description}</p>
                         <div className="mt-4 flex justify-between items-center">
                             <div className="flex items-center">
                                 {[...Array(5)].map((_, i) => (
                                     <svg key={i} className={`h-5 w-5 ${i < tomato.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                 ))}
                             </div>
                             <div className="flex space-x-2">
                                <button onClick={() => setEditingTomato(tomato)} className="text-gray-400 hover:text-blue-600"><PencilIcon className="h-5 w-5" /></button>
                                <button onClick={() => deleteTomato(tomato.id)} className="text-gray-400 hover:text-red-600"><TrashIcon className="h-5 w-5" /></button>
                             </div>
                         </div>
                     </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
