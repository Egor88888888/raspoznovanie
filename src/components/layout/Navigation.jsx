import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  // Список ссылок навигации
  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/about', label: 'О проекте' },
    { path: '/dashboard', label: 'Дашборд' },
  ];
  
  return (
    <nav className="flex space-x-6">
      {navLinks.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          className={`text-gray-700 hover:text-blue-600 ${
            location.pathname === link.path ? 'font-medium text-blue-600' : ''
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;