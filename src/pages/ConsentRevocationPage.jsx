import React from 'react';
import ConsentRevocationForm from '../components/features/ConsentRevocationForm';

const ConsentRevocationPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-warevision-dark-blue mb-6">
        Отзыв согласия на обработку персональных данных
      </h1>
      
      <p className="text-gray-700 mb-8">
        Заполните форму ниже, чтобы отозвать ваше согласие на обработку персональных данных. 
        После получения вашего запроса, мы обработаем его в течение 30 календарных дней в соответствии с 
        Федеральным законом "О персональных данных" от 27.07.2006 N 152-ФЗ.
      </p>
      
      <ConsentRevocationForm />
      
      <div className="mt-8 bg-warevision-gray p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Важное примечание</h2>
        <p className="text-gray-700">
          Отзыв согласия на обработку персональных данных приведет к удалению вашей учетной записи и 
          всех связанных с ней данных из наших систем. Вы больше не сможете пользоваться нашими услугами без 
          предоставления персональных данных повторно. Если у вас есть вопросы, пожалуйста, свяжитесь с нашей
          службой поддержки по электронной почте: support@warevision.com
        </p>
      </div>
    </div>
  );
};

export default ConsentRevocationPage;
