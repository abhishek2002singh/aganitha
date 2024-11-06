import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../utils/bookSlice';
import Card from './Card';

const Data = () => {
  const [bookTitle, setBookTitle] = useState('');
  const dispatch = useDispatch();

 
  const books = useSelector((state) => state.book);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const fetchBooks = async (title = 'bestseller') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${title}`);
      const result = await response.json();
      dispatch(setBooks(result.docs));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchBooks(); 
  }, []);

  
  const handleSearch = () => {
    if (bookTitle) fetchBooks(bookTitle); 
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Book Finder</h1>
      <div className="flex flex-col sm:flex-row w-full max-w-md mb-4">
        <input
          type="text"
          placeholder="Search for books..."
          className="p-2 border rounded-md w-full sm:mr-2 mb-2 sm:mb-0"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-md w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.length > 0 ? (
          books.map((book, index) => (
            <Card
              key={index}
              title={book.title}
              author={book.author_name ? book.author_name.join(', ') : 'Unknown'}
              year={book.first_publish_year || 'N/A'}
              coverId={book.cover_i}
            />
          ))
        ) : (
          <p className="text-gray-500">No books found</p>
        )}
      </div>
    </div>
  );
};

export default Data;
