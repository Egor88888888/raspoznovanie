import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-warevision-dark-blue">
            WareVision
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-warevision-black hover:text-warevision-dark-blue">
              Главная
            </Link>
            <Link to="/about" className="text-warevision-black hover:text-warevision-dark-blue">
              О компании
            </Link>
            <Link to="/contact" className="text-warevision-black hover:text-warevision-dark-blue">
              Контакты
            </Link>
            <Link to="/privacy" className="text-warevision-black hover:text-warevision-dark-blue">
              Конфиденциальность
            </Link>
          </nav>
          <div className="md:hidden">
            <button className="text-warevision-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
