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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl mb-4">Add a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-semibold">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 text-black p-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md"
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
