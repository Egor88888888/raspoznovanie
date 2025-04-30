import React from 'react';
import Card from '../../ui/Card';

const VerificationMethodSelector = ({ onSelect }) => {
  const methods = [
    {
      id: 'kep',
      title: 'Квалифицированная электронная подпись (КЭП)',
      description: 'Используйте вашу КЭП для юридически значимого подтверждения личности',
      icon: '🔐',
      primary: true
    },
    {
      id: 'bankid',
      title: 'Верификация через банк',
      description: 'Подтвердите личность через систему идентификации вашего банка',
      icon: '🏦',
      primary: false
    },
    {
      id: 'video',
      title: 'Видеоидентификация',
      description: 'Запись видео с паспортом для подтверждения личности',
      icon: '📹',
      primary: false,
      soon: true
    },
    {
      id: 'notary',
      title: 'Нотариальное заверение',
      description: 'Загрузите нотариально заверенное заявление об отзыве согласия',
      icon: '📝',
      primary: false
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-warevision-dark-blue">Выберите способ подтверждения личности</h2>
      <p className="text-gray-600">
        Для юридической значимости отзыва согласия необходимо подтвердить вашу личность одним из следующих способов:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {methods.map(method => (
          <Card 
            key={method.id}
            className={`cursor-pointer hover:shadow-lg transition-all ${
              method.primary ? 'border-2 border-warevision-dark-blue' : ''
            } ${method.soon ? 'opacity-60' : ''}`}
            onClick={() => !method.soon && onSelect(method.id)}
          >
            <div className="flex items-start p-2">
              <div className="text-3xl mr-4">{method.icon}</div>
              <div>
                <h3 className="font-bold text-warevision-dark-blue flex items-center">
                  {method.title}
                  {method.primary && <span className="ml-2 text-xs bg-warevision-lime text-warevision-black px-2 py-1 rounded">Рекомендуется</span>}
                  {method.soon && <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Скоро</span>}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{method.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="bg-warevision-gray p-4 rounded-lg mt-4">
        <h3 className="font-bold text-warevision-dark-blue text-sm">Почему это важно?</h3>
        <p className="text-sm text-gray-600 mt-1">
          Согласно ФЗ-152 "О персональных данных", для отзыва согласия оператор должен убедиться, 
          что запрос действительно поступил от субъекта данных. Верификация обеспечивает юридическую 
          значимость вашего заявления и гарантирует его исполнение оператором.
        </p>
      </div>
    </div>
  );
};

export default VerificationMethodSelector;
