import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Список ссылок навигации
  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/about', label: 'О проекте' },
    { path: '/dashboard', label: 'Дашборд' },
  ];
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <div className="md:hidden">
      {/* Кнопка мобильного меню */}
      <button 
        onClick={toggleMenu}
        className="text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        <svg 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isOpen ? (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          ) : (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          )}
        </svg>
      </button>
      
      {/* Выпадающее меню */}
      {isOpen && (
        <div className="absolute top-16 right-0 left-0 bg-white shadow-md z-50 fade-in">
          <nav className="px-4 py-2">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`block py-2 ${
                  location.pathname === link.path 
                    ? 'font-medium text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;