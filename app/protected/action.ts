import { useState } from 'react';
import { createClient } from '../../utils/supabase/client';  


const supabase = createClient();

export const useAddPost = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddPost = async (title: string, content: string) => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      const user = data?.user; 

      if (!user) {
        alert("You need to be logged in to add a post.");
        return;
      }

      const { data: postData, error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            title: title,
            content: content,
            user_id: user.id,
          }
        ]);

      if (insertError) {
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
