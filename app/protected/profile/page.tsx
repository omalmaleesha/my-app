"use client";
import { createClient } from "../../../utils/supabase/client"; // Adjust path if needed
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js"; // Import the User type from Supabase
import { FaEdit } from "react-icons/fa";

type Post = {
  id: number;
  created_at: string;
  Title: string;
  Content: string;
  userId: string;
};

const Profile = () => {
  const router = useRouter();
  const supabase = createClient();

  // State for user and posts
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const checkAuthAndFetchPosts = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login"); // Redirect to login if not authenticated
        return;
      }

      setUser(session.user);

      // Fetch posts for the logged-in user
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("userId", session.user.id);

      if (error) {
        console.error("Error fetching posts:", error.message);
      } else {
        setPosts(data || []);
      }

      setLoading(false);
    };

    checkAuthAndFetchPosts();
  }, [router, supabase]);

  const handleEdit = (post: Post) => {
    setEditPostId(post.id);
    setEditTitle(post.Title);
    setEditContent(post.Content);
  };

  const handleSave = async () => {
    if (editPostId === null) return;

    const { error } = await supabase
      .from("posts")
      .update({ Title: editTitle, Content: editContent })
      .eq("id", editPostId);

    if (error) {
      console.error("Error updating post:", error.message);
    } else {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editPostId
            ? { ...post, Title: editTitle, Content: editContent }
            : post
        )
      );
      setEditPostId(null);
      setEditTitle("");
      setEditContent("");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen p-6">
      <header className="flex items-center justify-between w-full max-w-6xl mx-auto py-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome, {user?.email}!
        </h1>
      </header>

      <main className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            {/* Placeholder for user avatar */}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user?.email}
            </h2>
            <p className="text-gray-600">Manage your account and posts below</p>
            <button className="px-9 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition ease-in-out duration-300">
              Subscribe Now
            </button>
          </div>
        </div>

        {/* Display user posts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Posts</h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
                >
                  {editPostId === post.id ? (
                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full mb-3 focus:ring-2 focus:ring-blue-400"
                      />
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full mb-3 focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditPostId(null)}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-gray-900">
                        {post.Title}
                      </h3>
                      <p className="text-gray-700 mt-2">{post.Content}</p>
                      <button
                        onClick={() => handleEdit(post)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition flex items-center space-x-2"
                      >
                        {/* Edit icon from React Icons */}
                        <FaEdit className="h-5 w-5" />
                        <span>Edit</span>
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              You have not created any posts yet.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;
