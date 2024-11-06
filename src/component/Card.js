import React from 'react';

const Card = ({ title, author, year, coverId }) => {
  return (
    <div className="border rounded-md p-4 shadow-md bg-white flex flex-col items-center">
      <img
        src={coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://via.placeholder.com/150'}
        alt={title}
        className="mb-2 w-32 h-48 object-cover"
      />
      <h2 className="font-bold text-lg text-center">{title}</h2>
      <p className="text-gray-600">Author: {author || 'Unknown'}</p>
      <p className="text-gray-600">Year: {year || 'N/A'}</p>
    </div>
  );
};

export default Card;
