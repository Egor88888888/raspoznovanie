import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import PremiumFeatures from '../components/features/premium/PremiumFeatures';

const ConsentConfirmationPage = () => {
  const location = useLocation();
  const { success, requestId, pdf } = location.state || { success: false, requestId: null, pdf: false };
  
  if (!success) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-warevision-dark-blue mb-6">
          Что-то пошло не так
        </h1>
        <p className="text-gray-700 mb-6">
          К сожалению, мы не смогли обработать ваш запрос. Пожалуйста, попробуйте еще раз.
        </p>
        <Button variant="primary" onClick={() => window.history.back()}>
          Вернуться назад
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 text-green-500 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-24 w-24 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold text-warevision-dark-blue mb-4 text-center">
        Запрос успешно отправлен
      </h1>
      
      <Card className="mb-8">
        <p className="text-gray-700 mb-4">
          Ваш запрос на отзыв согласия на обработку персональных данных был успешно получен и зарегистрирован в нашей системе.
        </p>
        
        <div className="bg-warevision-gray p-4 rounded-lg mb-4">
          <p className="font-semibold">Номер вашего запроса: <span className="text-warevision-dark-blue">{requestId}</span></p>
          <p className="text-sm text-gray-600 mt-1">Сохраните этот номер для дальнейших обращений.</p>
        </div>
        
        {pdf && (
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📄</div>
              <div className="flex-1">
                <h3 className="font-medium">Заявление об отзыве согласия.pdf</h3>
                <p className="text-sm text-gray-600">
                  Создано: {new Date().toLocaleString()} • Размер: 152 KB
                </p>
              </div>
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => alert('PDF скачан')}
              >
                Скачать
              </Button>
            </div>
          </div>
        )}
        
        <p className="text-gray-700">
          Мы рассмотрим ваш запрос в течение 30 календарных дней согласно Федеральному закону "О персональных данных" и уведомим вас о результатах по указанным контактным данным.
        </p>
      </Card>
      
      <Card title="Статус вашего запроса" className="mb-8">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Заявление сформировано</h3>
              <p className="text-sm text-gray-600">{new Date().toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Заявление отправлено оператору</h3>
              <p className="text-sm text-gray-600">{new Date().toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Ожидание ответа оператора</h3>
              <p className="text-sm text-gray-500">Ожидается в течение 30 дней</p>
              <div className="mt-1">
                <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                  В процессе
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Завершение процесса</h3>
              <p className="text-sm text-gray-500">Ожидается</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="text-blue-500 text-xl mr-3">ℹ️</div>
            <div>
              <p className="font-medium text-blue-800">Отслеживание статуса</p>
              <p className="text-sm text-blue-700 mt-1">
                Включите функцию отслеживания ответов операторов, чтобы автоматически контролировать
                статус вашего запроса и получать уведомления о важных изменениях.
              </p>
              <Button variant="secondary" className="mt-3" size="small">
                Подключить отслеживание
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-warevision-dark-blue mb-4">
          Рекомендуемые действия
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:shadow-lg transition-all">
            <div className="flex flex-col h-full">
              <div className="flex items-start mb-4">
                <div className="text-3xl mr-4">🔎</div>
                <div>
                  <h3 className="font-bold text-warevision-dark-blue">Проверить утечки данных</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Узнайте, не попали ли ваши персональные данные в открытые базы утечек.
                  </p>
                </div>
              </div>
              <div className="mt-auto">
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => alert('Переход к проверке утечек')}
                >
                  Проверить данные
                </Button>
              </div>
            </div>
          </Card>
          
          <Card className="hover:shadow-lg transition-all">
            <div className="flex flex-col h-full">
              <div className="flex items-start mb-4">
                <div className="text-3xl mr-4">🗑️</div>
                <div>
                  <h3 className="font-bold text-warevision-dark-blue">Удалить аккаунты</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Автоматизируйте процесс удаления ваших аккаунтов из популярных сервисов.
                  </p>
                </div>
              </div>
              <div className="mt-auto">
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => alert('Переход к удалению аккаунтов')}
                >
                  Удалить аккаунты
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        <Link to="/">
          <Button variant="secondary">
            Вернуться на главную
          </Button>
        </Link>
        <Button 
          variant="primary"
          onClick={() => window.print()}
        >
          Распечатать подтверждение
        </Button>
      </div>
      
      <div className="mb-8">
        <PremiumFeatures onSelectFeature={(feature) => alert(`Выбрана функция: ${feature.title}`)} />
      </div>
    </div>
  );
};

export default ConsentConfirmationPage;
