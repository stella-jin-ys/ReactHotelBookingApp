// components/ImageGallery.tsx
import React from 'react';

const ImageGallery: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-3 grid-rows-2 gap-1 h-96">
        <div className="col-span-2 row-span-2">
          <img 
            src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Hotel lobby" 
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1514474208469-b634e8564bdb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Hotel lobby" 
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Hotel room" 
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;