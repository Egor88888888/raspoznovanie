import React, { useState } from 'react';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import Input from '../../ui/Input';

const BankIdVerification = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [bankSelected, setBankSelected] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const banks = [
    { id: 'sber', name: 'Сбербанк', icon: '🟢' },
    { id: 'tinkoff', name: 'Тинькофф', icon: '🟡' },
    { id: 'vtb', name: 'ВТБ', icon: '🔵' },
    { id: 'alfabank', name: 'Альфа-Банк', icon: '🔴' },
    { id: 'other', name: 'Другой банк', icon: '🏦' },
  ];
  
  const handleSelectBank = (bankId) => {
    setBankSelected(bankId);
    setStep(2);
    setError('');
  };
  
  const handleVerify = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Имитация процесса верификации через банк
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Имитируем успешную верификацию
      onComplete({
        verified: true,
        method: 'bankid',
        details: {
          bank: banks.find(b => b.id === bankSelected)?.name || 'Неизвестный банк',
          verifiedAt: new Date().toISOString()
        }
      });
    } catch (err) {
      setError('Произошла ошибка при верификации через банк. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card title="Верификация через банк">
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-gray-600">
            Выберите свой банк для подтверждения личности через систему BankID.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {banks.map(bank => (
              <div 
                key={bank.id}
                className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 flex items-center"
                onClick={() => handleSelectBank(bank.id)}
              >
                <span className="text-2xl mr-3">{bank.icon}</span>
                <span className="font-medium">{bank.name}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-warevision-gray p-4 rounded-lg mt-4 text-sm">
            <h3 className="font-bold text-warevision-dark-blue">Что такое верификация через банк?</h3>
            <p className="text-gray-600 mt-1">
              Банковская идентификация — это способ подтверждения личности через вашу банковскую
              систему. Банки проводят тщательную проверку личности при открытии счета,
              что позволяет использовать их как надежный источник идентификации.
            </p>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-gray-600">
            Для подтверждения личности через {banks.find(b => b.id === bankSelected)?.name}, 
            вам будет необходимо пройти авторизацию в вашем банковском приложении.
          </p>
          
          {bankSelected === 'sber' && (
            <div className="p-4 bg-green-50 rounded-lg flex items-center">
              <span className="text-2xl mr-3">🟢</span>
              <div>
                <p className="font-medium">Авторизация через Сбербанк</p>
                <p className="text-sm text-gray-600">Вы будете перенаправлены на страницу авторизации СберID</p>
              </div>
            </div>
          )}
          
          {bankSelected === 'tinkoff' && (
            <div className="p-4 bg-yellow-50 rounded-lg flex items-center">
              <span className="text-2xl mr-3">🟡</span>
              <div>
                <p className="font-medium">Авторизация через Тинькофф</p>
                <p className="text-sm text-gray-600">Вы будете перенаправлены на страницу авторизации Тинькофф</p>
              </div>
            </div>
          )}
          
          {bankSelected === 'vtb' && (
            <div className="p-4 bg-blue-50 rounded-lg flex items-center">
              <span className="text-2xl mr-3">🔵</span>
              <div>
                <p className="font-medium">Авторизация через ВТБ</p>
                <p className="text-sm text-gray-600">Вы будете перенаправлены на страницу авторизации ВТБ</p>
              </div>
            </div>
          )}
          
          {bankSelected === 'alfabank' && (
            <div className="p-4 bg-red-50 rounded-lg flex items-center">
              <span className="text-2xl mr-3">🔴</span>
              <div>
                <p className="font-medium">Авторизация через Альфа-Банк</p>
                <p className="text-sm text-gray-600">Вы будете перенаправлены на страницу авторизации Альфа-Банк</p>
              </div>
            </div>
          )}
          
          {bankSelected === 'other' && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <Input
                label="Номер телефона, привязанный к банковскому счету"
                placeholder="+7 (___) ___-__-__"
                type="tel"
              />
              <Input
                label="Выберите ваш банк"
                type="select"
                className="mt-3"
                options={[
                  { value: '', label: 'Выберите банк...' },
                  { value: 'gazprombank', label: 'Газпромбанк' },
                  { value: 'raiffeisen', label: 'Райффайзенбанк' },
                  { value: 'otkritie', label: 'Открытие' },
                  { value: 'rosbank', label: 'Росбанк' },
                ]}
              />
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="secondary"
              onClick={() => setStep(1)}
            >
              Назад
            </Button>
            <Button 
              variant="primary"
              onClick={handleVerify}
              disabled={isLoading}
            >
              {isLoading ? 'Проверка...' : 'Продолжить'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BankIdVerification;
