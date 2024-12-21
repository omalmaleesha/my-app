'use client';
import { createClient } from '../../../utils/supabase/client'; // Adjust path if needed
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js'; // Import the User type from Supabase

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

  useEffect(() => {
    const checkAuthAndFetchPosts = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login'); // Redirect to login if not authenticated
        return;
      }

      setUser(session.user);

      // Fetch posts for the logged-in user
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('userId', session.user.id);

      if (error) {
        console.error('Error fetching posts:', error.message);
      } else {
        setPosts(data || []);
      }

      setLoading(false);
    };

    checkAuthAndFetchPosts();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">Welcome, {user?.email}!</h1>
      <p className="text-lg text-gray-600 mt-4">
        This is your profile page. Manage your account here.
      </p>

      {/* Display user posts */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Posts</h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <h3 className="text-xl font-bold text-gray-900">{post.Title}</h3>
                <p className="text-gray-700 mt-2">{post.Content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have not created any posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
