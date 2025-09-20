import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  // directly get URL
  const imageUrl = featuredImage ? appwriteService.getFilePreview(featuredImage) : null;
  

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        {imageUrl && (
          <div className="w-full flex justify-center mb-4">
            <img src={imageUrl} alt={title} className="rounded-xl" />
          </div>
        )}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
