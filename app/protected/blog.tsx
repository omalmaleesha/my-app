'use client';
import React, { useState } from 'react';
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
    <div className="bg-gray-200 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-wide">Blog Posts</h1>

          {/* "My Account" navigates to the Profile page */}
          <h1
            className="cursor-pointer text-xl font-medium text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-105"
            onClick={() => router.push('/protected/profile')} // Navigate to the Profile page
          >
            My Account
          </h1>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.Title}</h2>
                  <ContentToggle content={post.Content} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">No posts available.</p>
          )}
        </div>
      </main>

      {/* Add Post Button */}
      <div className="fixed bottom-8 right-8 bg-blue-600 text-white p-5 rounded-full shadow-lg hover:bg-black transition duration-300">
        <button
          className="flex items-center justify-center"
          onClick={togglePopup}
        >
          <FaPlus className="text-3xl" />
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
interface ContentToggleProps {
  content: string; // content should be a string
}

// Content Toggle Component to manage "Read more"
const ContentToggle: React.FC<ContentToggleProps> = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {/* Display truncated or full content based on the state */}
      <p className="text-gray-600 text-lg leading-relaxed">
        {isExpanded ? content : content.substring(0, 150) + "..."}
      </p>

      {/* "Read more" / "Show less" button */}
      <button
        className="text-blue-500 mt-2 hover:underline"
        onClick={handleToggle}
      >
        {isExpanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
};
export default Blog;
