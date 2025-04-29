import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ConsentConfirmationPage = () => {
  const location = useLocation();
  const { success, requestId } = location.state || { success: false, requestId: null };
  
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
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-6 text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-24 w-24 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold text-warevision-dark-blue mb-4">
        Запрос успешно отправлен
      </h1>
      
      <Card className="mb-8 text-left">
        <p className="text-gray-700 mb-4">
          Ваш запрос на отзыв согласия на обработку персональных данных был успешно получен и зарегистрирован в нашей системе.
        </p>
        
        <div className="bg-warevision-gray p-4 rounded-lg mb-4">
          <p className="font-semibold">Номер вашего запроса: <span className="text-warevision-dark-blue">{requestId}</span></p>
          <p className="text-sm text-gray-600 mt-1">Сохраните этот номер для дальнейших обращений.</p>
        </div>
        
        <p className="text-gray-700">
          Мы рассмотрим ваш запрос в течение 30 календарных дней согласно Федеральному закону "О персональных данных" и уведомим вас о результатах по указанным контактным данным.
        </p>
      </Card>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
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
    </div>
  );
};

export default ConsentConfirmationPage;
