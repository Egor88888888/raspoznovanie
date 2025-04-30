import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Имитация статуса авторизации пользователя
  const [isLoggedIn] = useState(true);
  
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
          
          <div className="hidden md:block">
            {isLoggedIn ? (
              <Link to="/account">
                <Button variant="secondary">Личный кабинет</Button>
              </Link>
            ) : (
              <Button variant="primary">Войти</Button>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              className="text-warevision-black p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-warevision-black hover:text-warevision-dark-blue"
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              <Link 
                to="/about" 
                className="text-warevision-black hover:text-warevision-dark-blue"
                onClick={() => setIsMenuOpen(false)}
              >
                О компании
              </Link>
              <Link 
                to="/contact" 
                className="text-warevision-black hover:text-warevision-dark-blue"
                onClick={() => setIsMenuOpen(false)}
              >
                Контакты
              </Link>
              <Link 
                to="/privacy" 
                className="text-warevision-black hover:text-warevision-dark-blue"
                onClick={() => setIsMenuOpen(false)}
              >
                Конфиденциальность
              </Link>
              {isLoggedIn ? (
                <Link 
                  to="/account"
                  className="text-warevision-dark-blue font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Личный кабинет
                </Link>
              ) : (
                <button 
                  className="text-warevision-dark-blue font-medium"
                  onClick={() => {
                    setIsMenuOpen(false);
                    // Здесь была бы логика открытия формы входа
                  }}
                >
                  Войти
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
