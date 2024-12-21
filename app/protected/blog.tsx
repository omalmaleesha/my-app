'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import { FaPlus } from 'react-icons/fa';
import AddPostPopup from './AddPostPopup';
import { useAddPost } from './action';
import { useFetchPosts } from './action';

function Blog() {
  const router = useRouter(); // Initialize the router

  const { posts, loading, error, refetch } = useFetchPosts();
  const { showPopup, togglePopup, handleAddPost } = useAddPost();

  return (
    <div className="bg-black-50 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="container mx-auto p-2">
        <div className="flex justify-between items-center p-2">
          <h1 className="text-3xl font-bold text-white-800">Blog Posts</h1>
          {/* "My Account" navigates to the Profile page */}
          <h1
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() => router.push('/protected/profile')} // Navigate to the Profile page
          >
            My Account
          </h1>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{post.Title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{post.Content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">No posts available.</p>
          )}
        </div>
      </main>

      {/* Add Post Button */}
      <div className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition">
        <button
          className="flex items-center justify-center"
          onClick={togglePopup}
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>

      {/* Add Post Popup */}
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
