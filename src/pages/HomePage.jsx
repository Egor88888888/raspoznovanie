import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const HomePage = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-warevision-dark-blue mb-4">
          Управление персональными данными
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          WareVision обеспечивает полную прозрачность в обработке ваших персональных данных. 
          Вы всегда можете управлять своими данными через наш портал.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card title="Безопасность">
          <p className="text-gray-600 mb-4">
            Мы используем современные технологии шифрования и защиты для обеспечения безопасности ваших личных данных.
          </p>
          <Link to="/privacy" className="text-warevision-dark-blue font-semibold hover:underline">
            Узнать больше →
          </Link>
        </Card>
        
        <Card title="Прозрачность">
          <p className="text-gray-600 mb-4">
            Вы всегда знаете, какие данные мы собираем и как они используются для улучшения наших сервисов.
          </p>
          <Link to="/privacy" className="text-warevision-dark-blue font-semibold hover:underline">
            Политика конфиденциальности →
          </Link>
        </Card>
        
        <Card title="Контроль">
          <p className="text-gray-600 mb-4">
            Управляйте своими персональными данными: просматривайте, обновляйте или отзывайте согласие в любое время.
          </p>
          <Link to="/consent/revoke" className="text-warevision-dark-blue font-semibold hover:underline">
            Управление согласием →
          </Link>
        </Card>
      </div>
      
      <div className="bg-warevision-dark-blue text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Нужна помощь с вашими данными?</h2>
        <p className="text-xl mb-6">
          Наша команда готова ответить на любые вопросы о том, как мы обрабатываем ваши персональные данные.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/contact">
            <Button variant="primary">Связаться с нами</Button>
          </Link>
          <Link to="/consent/revoke">
            <Button variant="secondary">Отозвать согласие</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
