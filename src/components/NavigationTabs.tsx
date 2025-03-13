// components/NavigationTabs.tsx
import React from 'react';

const NavigationTabs: React.FC = () => {
  return (
    <nav className="bg-white rounded-t-lg shadow-sm mb-6">
      <ul className="flex flex-wrap text-sm font-medium text-center border-b">
        <li className="mr-2">
          <a href="#overview" className="inline-block p-4 border-b-2 border-black-100 rounded-t-lg text-gray-600">Overview</a>
        </li>
        <li className="mr-2">
          <a href="#info" className="inline-block p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 text-gray-500">Info & prices</a>
        </li>
        <li className="mr-2">
          <a href="#facilities" className="inline-block p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 text-gray-500">Facilities</a>
        </li>
        <li className="mr-2">
          <a href="#reviews" className="inline-block p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 text-gray-500">Guest reviews</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationTabs;