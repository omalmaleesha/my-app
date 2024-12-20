// Blog.tsx
'use client';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import AddPostPopup from './AddPostPopup';
import { useAddPost } from './action';  

function Blog() {
  const { showPopup, togglePopup, handleAddPost } = useAddPost(); 

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Post Example */}
          <div className="bg-white-200 shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">Post Title 1</h2>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <a href="/post/1" className="text-blue-600 mt-4 inline-block">
              Read More
            </a>
          </div>
        </div>
      </main>

      {/* Add Post Button */}
      <div className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition">
        <button
          className="flex items-center justify-center"
          onClick={togglePopup} 
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>

      {showPopup && (
        <AddPostPopup
          onClose={togglePopup}  
          onSubmit={handleAddPost}  
        />
      )}
    </div>
  );
}

export default Blog;
