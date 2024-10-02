import React, { useState, useEffect } from 'react';

// Datos de frases (asumimos que están en un archivo local llamado frasesData.js)
import { frases } from './assets/frasesData';

export default function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Extraer categorías únicas
    const uniqueCategories = [...new Set(frases.map(frase => frase.categoria))];
    setCategories(uniqueCategories);
    // Cargar una frase aleatoria al inicio
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = (category = '') => {
    let filteredFrases = frases;
    if (category) {
      filteredFrases = frases.filter(frase => frase.categoria === category);
    }
    const randomFrase = filteredFrases[Math.floor(Math.random() * filteredFrases.length)];
    setQuote(randomFrase.frase);
    setAuthor(randomFrase.autor);
    setCategory(randomFrase.categoria);
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchRandomQuote(selectedCategory);
    } else {
      fetchRandomQuote();
    }
  }, [selectedCategory]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${quote} - ${author}`);
    alert('Frase copiada al portapapeles!');
  };

  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Frase Motivacional',
        text: `${quote} - ${author}`,
      }).then(() => {
        console.log('¡Gracias por compartir!');
      }).catch(console.error);
    } else {
      alert('Web Share API no está soportada en tu navegador');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Frases Motivacionales</h1>
        
        <div className="mb-4">
          <label htmlFor="category-select" className="block text-sm font-medium text-primary mb-2">
            Selecciona una categoría:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">TODAS LAS CATEGORÍAS</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        
        <div className="bg-secondary bg-opacity-20 rounded-lg p-6 mb-6">
          <p className="text-xl text-primary mb-4">"{quote}"</p>
          <p className="text-right text-primary font-semibold">- {author}</p>
          <p className="text-right text-primary text-sm italic">Categoría: {category}</p>
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={copyToClipboard} 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Copiar
          </button>
          <button 
            onClick={shareQuote} 
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Compartir
          </button>
          <button 
            onClick={() => fetchRandomQuote(selectedCategory)} 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Nueva Frase
          </button>
        </div>
      </div>
    </div>
  );
}