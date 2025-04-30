import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const VerificationMethods = ({ onSelectMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  
  const methods = [
    {
      id: 'kep',
      title: 'Квалифицированная электронная подпись (КЭП)',
      description: 'Загрузите файл КЭП для надежной идентификации и придания документу юридической силы.',
      icon: '🔐',
      premium: false
    },
    {
      id: 'video',
      title: 'Видеоверификация',
      description: 'Подтвердите личность через видеоидентификацию с проверкой паспорта.',
      icon: '📹',
      premium: true
    },
    {
      id: 'bankid',
      title: 'Идентификация через банк',
      description: 'Используйте учетную запись вашего банка для подтверждения личности.',
      icon: '🏦',
      premium: true
    },
    {
      id: 'standard',
      title: 'Стандартная верификация',
      description: 'Предоставьте паспортные данные. Документ будет отправлен на email компании.',
      icon: '📝',
      premium: false
    }
  ];
  
  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };
  
  const handleContinue = () => {
    if (selectedMethod) {
      onSelectMethod(selectedMethod);
    }
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-warevision-dark-blue mb-4">
        Выберите способ подтверждения личности
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {methods.map((method) => (
          <div 
            key={method.id}
            className={`
              cursor-pointer border rounded-lg p-4 transition-all
              ${selectedMethod === method.id 
                ? 'border-warevision-dark-blue bg-blue-50' 
                : 'border-gray-200 hover:border-warevision-blue'
              }
              ${method.premium ? 'relative' : ''}
            `}
            onClick={() => handleSelectMethod(method.id)}
          >
            {method.premium && (
              <span className="absolute top-2 right-2 bg-warevision-lime text-warevision-black text-xs px-2 py-1 rounded-full font-semibold">
                Premium
              </span>
            )}
            <div className="flex items-start">
              <div className="text-2xl mr-3">{method.icon}</div>
              <div>
                <h3 className="font-semibold text-warevision-dark-blue">{method.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{method.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="primary" 
          onClick={handleContinue}
          disabled={!selectedMethod}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default VerificationMethods;
