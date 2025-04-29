import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-warevision-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">WareVision</h3>
            <p className="text-gray-300">
              Инновационные решения для управления данными
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Главная</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">О компании</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">Конфиденциальность</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Связаться с нами</Link>
              </li>
              <li>
                <Link to="/consent/revoke" className="text-gray-300 hover:text-white">Отозвать согласие</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: <a href="mailto:info@w-vision.ru" className="hover:text-white">info@w-vision.ru</a></li>
              <li className="text-gray-300">Телефон: <a href="tel:+79129369269" className="hover:text-white">+7 (912) 936-92-69</a></li>
              <li className="text-gray-300">ООО «Вэвижн»</li>
              <li className="text-gray-300">127495, г. Москва, Долгопрудненское шоссе, д. 3 пом VII ком 22 «В»</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} WareVision. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
