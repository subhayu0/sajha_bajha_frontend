import React from 'react';

const products = [
  {
    name: 'Acoustic Guitar',
    description: 'Warm tone wood body, perfect for beginners and pros.',
    image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947',
    price: 'Rs 14000',
  },
  {
    name: 'Drum Set',
    description: '5-piece rock drum kit with cymbals and stool.',
    image: 'https://images.unsplash.com/photo-1577631059634-0cf19b51b9f2',
    price: 'Rs 49499',
  },
  {
    name: 'Violin',
    description: 'Elegant violin with bow and case. Full size.',
    image: 'https://images.unsplash.com/photo-1603468621805-fab46aa1bce4',
    price: 'Rs 5149',
  },
  {
    name: 'Electric Guitar',
    description: 'Strat-style electric guitar with amp bundle.',
    image: 'https://images.unsplash.com/photo-1505731131272-97d991f0bba3',
    price: 'Rs 22299',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-800 to-purple-900 p-6">
      <h1 className="text-white text-4xl font-bold text-center mb-8">🎶 Welcome to Sajha Bajha</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-indigo-700">{product.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-indigo-600 font-semibold">{product.price}</span>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
