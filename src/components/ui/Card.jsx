import React from 'react';

const Card = ({ 
  children, 
  title, 
  className = '', 
  headerClassName = '',
  bodyClassName = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className={`bg-gray-50 px-4 py-3 border-b ${headerClassName}`}>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        </div>
      )}
      <div className={`p-4 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;