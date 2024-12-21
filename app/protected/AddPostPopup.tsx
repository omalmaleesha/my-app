// AddPostPopup.tsx
import React, { useState } from 'react';

interface AddPostPopupProps {
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
}

function AddPostPopup({ onClose, onSubmit }: AddPostPopupProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4">
  <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add a New Post</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-semibold text-gray-700">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          required
        />
      </div>
      <div className="flex justify-between gap-4">
        <button
          type="button"
          className="bg-gray-300 text-black p-3 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Add Post
        </button>
      </div>
    </form>
  </div>
</div>
  );
}

export default AddPostPopup;
