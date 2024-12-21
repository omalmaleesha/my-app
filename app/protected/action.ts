import { useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { useEffect } from 'react';

const supabase = createClient(); 

export const useAddPost = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddPost = async (Title: string, Content: string) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
  
      if (userError) {
        console.error("Error fetching user:", userError.message);
        throw userError;
      }
  
      const user = userData?.user;
  
      if (!user) {
        alert("You need to be logged in to add a post.");
        return;
      }
  
      const { data: postData, error: insertError } = await supabase
        .from("posts")
        .insert([{ Title, Content, userId: user.id }]);
  
      if (insertError) {
        console.error("Insert error:", insertError.message);
        throw insertError;
      }
  
      alert("Post added successfully!");
      console.log("Post added:", postData);
    } catch (err) {
      console.error("Error adding post:", err);
      alert("Failed to add post.");
    }
  };
  

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return {
    showPopup,
    togglePopup,
    handleAddPost,
  };
};


interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
}


export const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // action.ts
  type Post = {
  id: number;
  created_at: string;
  Title: string;  // Update the property name to match the data
  Content: string; // Update the property name to match the data
  userId: string;
  };


  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPosts(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch posts.');
    } finally {
      setLoading(false);
      
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, refetch: fetchPosts };
};



export const fetchPostsByUserId = async (userId: string) => {
  type Post = {
    id: number;
    created_at: string;
    Title: string;  // Update the property name to match the data
    Content: string; // Update the property name to match the data
    userId: string;
    };
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('userId', userId);

    if (error) throw new Error(error.message);

    return { data: data as Post[], error: null };
  } catch (err: any) {
    return { data: null, error: err.message || 'Failed to fetch posts' };
  }
};
