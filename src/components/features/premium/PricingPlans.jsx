import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../ui/Card';
import Button from '../../ui/Button';

const PricingPlans = () => {
  const plans = [
    {
      id: 'free',
      name: 'Базовый',
      price: '0 ₽',
      period: 'навсегда',
      description: 'Основные функции для отзыва согласия',
      features: [
        'Формирование заявления об отзыве согласия',
        'Поиск реквизитов организаций',
        'Базовая проверка личности',
        'Хранение истории запросов',
      ],
      highlighted: false,
      button: 'Начать бесплатно'
    },
    {
      id: 'pro',
      name: 'PRO',
      price: '399 ₽',
      period: 'месяц',
      description: 'Расширенные возможности для контроля данных',
      features: [
        'Все функции базового плана',
        'Проверка утечек данных',
        'Контроль за ответами операторов',
        'Электронная подпись документов',
        'Приоритетная поддержка',
      ],
      highlighted: true,
      button: 'Выбрать PRO'
    },
    {
      id: 'business',
      name: 'Бизнес',
      price: '999 ₽',
      period: 'месяц',
      description: 'Полный контроль над персональными данными',
      features: [
        'Все функции PRO плана',
        'Массовое удаление аккаунтов',
        'Автоматизированные жалобы',
        'Юридическое сопровождение',
        'Проверка кредитного рейтинга',
        'Выделенный менеджер',
      ],
      highlighted: false,
      button: 'Получить предложение'
    }
  ];

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-warevision-dark-blue mb-4">
          Тарифные планы
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Выберите подходящий план для защиты ваших персональных данных
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className={`relative ${plan.highlighted ? 'transform -translate-y-4' : ''}`}>
            {plan.highlighted && (
              <div className="absolute -top-5 left-0 right-0 text-center">
                <span className="bg-warevision-lime text-warevision-black px-4 py-1 rounded-full text-sm font-bold">
                  Популярный выбор
                </span>
              </div>
            )}
            
            <Card className={`h-full flex flex-col ${
              plan.highlighted 
                ? 'border-2 border-warevision-dark-blue shadow-lg' 
                : ''
            }`}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-warevision-dark-blue">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <Button
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {plan.button}
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Нужен индивидуальный план? Свяжитесь с нами для получения персонального предложения.
        </p>
        <Link to="/contact">
          <Button variant="secondary">
            Связаться с нами
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PricingPlans;
