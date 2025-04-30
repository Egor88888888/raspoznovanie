import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Link } from 'react-router-dom';

const PremiumFeatures = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'leak-monitoring',
      title: 'Мониторинг утечек данных',
      description: 'Автоматическая проверка, не попали ли ваши данные в открытые базы утечек',
      icon: '🛡️',
      price: 199,
      period: 'месяц'
    },
    {
      id: 'account-removal',
      title: 'Удаление аккаунтов',
      description: 'Автоматизированные запросы на удаление ваших данных из популярных сервисов',
      icon: '🗑️',
      price: 299,
      period: 'единоразово'
    },
    {
      id: 'response-tracking',
      title: 'Отслеживание ответов',
      description: 'Контроль за ответами компаний и помощь с подачей жалоб при игнорировании',
      icon: '📊',
      price: 399,
      period: 'за запрос'
    },
    {
      id: 'credit-score',
      title: 'Кредитный рейтинг',
      description: 'Проверка вашего кредитного рейтинга и советы по его улучшению',
      icon: '📈',
      price: 499,
      period: 'единоразово'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-warevision-dark-blue mb-4">Премиум функции</h2>
      <p className="text-gray-600 mb-6">
        Получите дополнительные возможности для контроля ваших персональных данных и повышения безопасности.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map(feature => (
          <Card key={feature.id} className="hover:shadow-lg transition-all">
            <div className="flex items-start">
              <div className="text-3xl mr-4">{feature.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-warevision-dark-blue">{feature.title}</h3>
                <p className="text-gray-600 text-sm mt-1 mb-4">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-warevision-dark-blue font-bold">
                    {feature.price} ₽/{feature.period}
                  </div>
                  <Button 
                    variant="secondary" 
                    size="small"
                    onClick={() => onSelectFeature(feature)}
                  >
                    Подключить
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 bg-warevision-dark-blue text-white p-6 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Комплексная защита данных</h3>
            <p className="text-gray-200 mb-4 md:mb-0">
              Подключите все премиум функции сразу и получите скидку 30%
            </p>
          </div>
          <Button variant="primary">
            Подключить за 999 ₽/год
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatures;
