import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import DataLeakMonitoring from '../components/features/premium/DataLeakMonitoring';
import SubscriptionModal from '../components/features/premium/SubscriptionModal';

const UserAccountPage = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  
  // Имитация данных пользователя
  const userData = {
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (912) 345-67-89',
    registeredAt: '2023-05-15T14:32:00Z',
    subscriptions: [
      { 
        id: 'sub_1', 
        name: 'Мониторинг утечек данных', 
        status: 'active',
        nextPayment: '2023-06-15',
        price: 199
      }
    ],
    requests: [
      {
        id: 'RQ-123456',
        type: 'Отзыв согласия',
        organization: 'ООО "АльфаТрейд"',
        status: 'completed',
        createdAt: '2023-04-20T10:15:00Z',
        completedAt: '2023-05-10T14:30:00Z'
      },
      {
        id: 'RQ-234567',
        type: 'Отзыв согласия',
        organization: 'ПАО "ГаммаБанк"',
        status: 'processing',
        createdAt: '2023-05-05T16:42:00Z',
        completedAt: null
      }
    ]
  };
  
  const handleSubscribeClick = (feature) => {
    setSelectedFeature(feature);
    setShowSubscriptionModal(true);
  };
  
  const handleSubscription = (data) => {
    // Здесь была бы обработка подписки
    alert(`Подписка на "${data.feature.title}" успешно оформлена!`);
    setShowSubscriptionModal(false);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'requests':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-warevision-dark-blue">Мои запросы</h2>
            
            {userData.requests.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">У вас еще нет запросов на отзыв согласия</p>
                <Link to="/consent/revoke" className="inline-block mt-4">
                  <Button variant="primary">Создать запрос</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userData.requests.map(request => (
                  <Card key={request.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{request.type}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Организация: {request.organization}
                        </p>
                        <p className="text-sm text-gray-600">
                          Создан: {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                        {request.completedAt && (
                          <p className="text-sm text-gray-600">
                            Завершен: {new Date(request.completedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status === 'completed' ? 'Завершен' : 'В обработке'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 border-t pt-4 flex justify-end">
                      <Button 
                        variant="secondary"
                        size="small"
                        onClick={() => alert(`Открыты детали запроса ${request.id}`)}
                      >
                        Подробнее
                      </Button>
                    </div>
                  </Card>
                ))}
                
                <div className="text-center mt-6">
                  <Link to="/consent/revoke">
                    <Button variant="primary">Создать новый запрос</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'services':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-warevision-dark-blue">Подключенные сервисы</h2>
            
            {userData.subscriptions.length > 0 && (
              <div className="space-y-4 mb-8">
                <h3 className="font-medium text-gray-700">Ваши подписки</h3>
                {userData.subscriptions.map((sub, index) => (
                  <Card key={index}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{sub.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Следующий платеж: {sub.nextPayment} • {sub.price} ₽/мес
                        </p>
                      </div>
                      <Button 
                        variant="secondary"
                        size="small"
                        onClick={() => alert(`Отмена подписки ${sub.id}`)}
                      >
                        Отменить подписку
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            <div>
              <h3 className="font-medium text-gray-700 mb-4">Доступные сервисы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: 'leak-monitoring',
                    title: 'Мониторинг утечек данных',
                    description: 'Узнайте, не попали ли ваши данные в открытые базы утечек',
                    price: 199,
                    period: 'месяц',
                    icon: '🛡️'
                  },
                  {
                    id: 'account-removal',
                    title: 'Удаление аккаунтов',
                    description: 'Автоматическое удаление ваших данных из сервисов',
                    price: 299,
                    period: 'единоразово',
                    icon: '🗑️'
                  },
                  {
                    id: 'response-tracking',
                    title: 'Отслеживание ответов',
                    description: 'Контроль за ответами операторов и помощь с жалобами',
                    price: 399,
                    period: 'за запрос',
                    icon: '📊'
                  }
                ].map(feature => (
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
                            onClick={() => handleSubscribeClick(feature)}
                          >
                            Подключить
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-warevision-dark-blue">Безопасность</h2>
            
            <Card title="Проверка утечек данных">
              <DataLeakMonitoring />
            </Card>
            
            <Card title="Безопасность аккаунта">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Двухфакторная аутентификация</h3>
                    <p className="text-sm text-gray-600">
                      Повысьте безопасность вашего аккаунта с помощью дополнительного уровня защиты
                    </p>
                  </div>
                  <div>
                    <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-300">
                      <span className="absolute h-4 w-4 left-1 bg-white rounded-full transform transition-transform"></span>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">История входов</h3>
                    <p className="text-sm text-gray-600">
                      Последний вход: {new Date().toLocaleString()}
                    </p>
                  </div>
                  <Button variant="secondary" size="small">
                    Просмотреть
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Сменить пароль</h3>
                    <p className="text-sm text-gray-600">
                      Рекомендуется менять пароль каждые 3 месяца
                    </p>
                  </div>
                  <Button variant="secondary" size="small">
                    Изменить
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-warevision-dark-blue">Личные данные</h2>
            
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Имя</h3>
                  <p className="text-gray-900">{userData.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-gray-900">{userData.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Телефон</h3>
                  <p className="text-gray-900">{userData.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Дата регистрации</h3>
                  <p className="text-gray-900">{new Date(userData.registeredAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t flex justify-end">
                <Button variant="secondary">Редактировать профиль</Button>
              </div>
            </Card>
            
            <Card title="Настройки уведомлений">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Email-уведомления</h3>
                    <p className="text-sm text-gray-600">
                      Получать уведомления о статусах запросов и утечках данных
                    </p>
                  </div>
                  <div>
                    <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-blue-600">
                      <span className="absolute h-4 w-4 right-1 bg-white rounded-full transform transition-transform"></span>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">SMS-уведомления</h3>
                    <p className="text-sm text-gray-600">
                      Получать важные уведомления по SMS
                    </p>
                  </div>
                  <div>
                    <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-300">
                      <span className="absolute h-4 w-4 left-1 bg-white rounded-full transform transition-transform"></span>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Маркетинговые рассылки</h3>
                    <p className="text-sm text-gray-600">
                      Получать информацию о специальных предложениях
                    </p>
                  </div>
                  <div>
                    <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-300">
                      <span className="absolute h-4 w-4 left-1 bg-white rounded-full transform transition-transform"></span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-warevision-dark-blue mb-6">
        Личный кабинет
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <div className="space-y-1 mb-6">
              <h2 className="font-bold text-lg">{userData.name}</h2>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>
            
            <nav className="space-y-1">
              {[
                { id: 'requests', label: 'Мои запросы', icon: '📝' },
                { id: 'services', label: 'Сервисы', icon: '🛠️' },
                { id: 'security', label: 'Безопасность', icon: '🔒' },
                { id: 'profile', label: 'Профиль', icon: '👤' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center w-full px-3 py-2 text-left rounded-md ${
                    activeTab === tab.id 
                      ? 'bg-warevision-blue bg-opacity-20 text-warevision-dark-blue font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="mt-6 pt-6 border-t">
              <button
                className="flex items-center w-full px-3 py-2 text-left rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => alert('Выход из аккаунта')}
              >
                <span className="mr-3">🚪</span>
                <span>Выйти</span>
              </button>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          {renderTabContent()}
        </div>
      </div>
      
      {showSubscriptionModal && (
        <SubscriptionModal
          feature={selectedFeature}
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={handleSubscription}
        />
      )}
    </div>
  );
};

export default UserAccountPage;
