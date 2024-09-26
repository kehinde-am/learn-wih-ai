"use client"
import React from 'react';

interface GoogleProps {
  onClick: () => void;
}

const Google: React.FC<GoogleProps> = ({ onClick }) => {
  return (
    <button 
      className="btn w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
      type="button"
    >
      Sign in with Google
    </button>
  );
};

export default Google;
