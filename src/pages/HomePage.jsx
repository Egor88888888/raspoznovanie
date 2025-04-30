import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import PricingPlans from '../components/features/premium/PricingPlans';

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
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/consent/revoke">
            <Button variant="primary" size="large">Отозвать согласие</Button>
          </Link>
          <Link to="/contact">
            <Button variant="secondary" size="large">Связаться с нами</Button>
          </Link>
        </div>
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
      
      <div className="mb-16">
        <div className="bg-warevision-dark-blue text-white rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Защитите свои персональные данные</h2>
              <p className="text-xl mb-6">
                Мы предлагаем комплексные решения для защиты и контроля ваших персональных данных в цифровом мире.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-warevision-lime mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Юридически значимый отзыв согласия</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-warevision-lime mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Мониторинг утечек данных</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-warevision-lime mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Контроль за ответами операторов</span>
                </li>
              </ul>
              <Link to="/consent/revoke">
                <Button variant="primary">Начать бесплатно</Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-lg p-6 transform rotate-3 shadow-xl">
                <div className="bg-warevision-gray p-4 rounded-lg mb-4">
                  <div className="h-6 w-32 bg-warevision-dark-blue rounded-full opacity-10"></div>
                  <div className="mt-2 h-4 w-48 bg-warevision-dark-blue rounded-full opacity-10"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-5 w-full bg-warevision-gray rounded-full"></div>
                  <div className="h-5 w-5/6 bg-warevision-gray rounded-full"></div>
                  <div className="h-5 w-4/6 bg-warevision-gray rounded-full"></div>
                </div>
                <div className="mt-6 flex justify-end">
                  <div className="h-8 w-28 bg-warevision-lime rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-warevision-dark-blue mb-8 text-center">
          Как это работает
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: 1,
              title: 'Заполните форму',
              description: 'Укажите ваши данные и выберите организацию, у которой хотите отозвать согласие',
              icon: '📝'
            },
            {
              step: 2,
              title: 'Подтвердите личность',
              description: 'Верифицируйте личность с помощью электронной подписи или через банк',
              icon: '🔐'
            },
            {
              step: 3,
              title: 'Получите документы',
              description: 'Мы сформируем юридически грамотное заявление об отзыве согласия',
              icon: '📄'
            },
            {
              step: 4,
              title: 'Отправьте оператору',
              description: 'Отправьте заявление оператору и контролируйте статус ответа',
              icon: '📤'
            }
          ].map((item) => (
            <Card key={item.step}>
              <div className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="w-8 h-8 bg-warevision-dark-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-warevision-dark-blue mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <PricingPlans />
      
      <div className="bg-warevision-gray rounded-lg p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-warevision-dark-blue mb-6">
            Часто задаваемые вопросы
          </h2>
          
          <div className="space-y-6 text-left">
            <div>
              <h3 className="text-xl font-bold text-warevision-dark-blue mb-2">
                Для чего нужен отзыв согласия на обработку персональных данных?
              </h3>
              <p className="text-gray-700">
                Отзыв согласия позволяет вам контролировать, какие компании имеют доступ к вашим данным.
                После отзыва согласия оператор обязан прекратить обработку ваших персональных данных и 
                при необходимости удалить их.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-warevision-dark-blue mb-2">
                Как подтверждается личность при отзыве согласия?
              </h3>
              <p className="text-gray-700">
                Для юридической значимости отзыва необходимо подтвердить вашу личность. Это можно сделать 
                с помощью квалифицированной электронной подписи (КЭП), через систему BankID или другие
                способы идентификации, предусмотренные законодательством.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-warevision-dark-blue mb-2">
                В какой срок оператор должен рассмотреть запрос?
              </h3>
              <p className="text-gray-700">
                Согласно Федеральному закону "О персональных данных", оператор обязан рассмотреть ваш запрос 
                в течение 30 календарных дней с момента получения и уведомить вас о результатах рассмотрения.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-warevision-dark-blue mb-2">
                Что делать, если оператор игнорирует запрос?
              </h3>
              <p className="text-gray-700">
                Если оператор не ответил в установленный срок или отказал без оснований, вы можете обратиться 
                с жалобой в Роскомнадзор или в суд. Наш сервис помогает автоматизировать и этот процесс.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
