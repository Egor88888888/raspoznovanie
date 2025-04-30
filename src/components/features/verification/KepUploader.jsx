import React, { useState } from 'react';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

const KepUploader = ({ onComplete }) => {
  const [file, setFile] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError('');
  };
  
  const handleVerify = async () => {
    if (!file) {
      setError('Пожалуйста, загрузите файл сертификата КЭП');
      return;
    }
    
    setIsVerifying(true);
    
    try {
      // Имитация проверки КЭП
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Для демонстрации: проверяем расширение файла
      if (file.name.toLowerCase().endsWith('.cer') || file.name.toLowerCase().endsWith('.p7b')) {
        // Успешная верификация
        onComplete({
          verified: true,
          method: 'kep',
          details: {
            fileName: file.name,
            verifiedAt: new Date().toISOString()
          }
        });
      } else {
        setError('Недействительный формат файла. Пожалуйста, загрузите сертификат в формате .cer или .p7b');
      }
    } catch (err) {
      setError('Произошла ошибка при проверке сертификата. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <Card title="Верификация с помощью КЭП">
      <div className="space-y-4">
        <p className="text-gray-600">
          Загрузите ваш файл сертификата КЭП для подтверждения личности. Это обеспечит 
          юридическую значимость вашего заявления об отзыве согласия.
        </p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            id="kep-file"
            className="hidden"
            onChange={handleFileChange}
            accept=".cer,.p7b,.pfx"
          />
          <label htmlFor="kep-file" className="cursor-pointer">
            <div className="text-3xl mb-2">📄</div>
            <p className="text-warevision-dark-blue font-medium">
              {file ? file.name : 'Нажмите для загрузки сертификата КЭП'}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {file ? `${(file.size / 1024).toFixed(2)} KB` : 'Поддерживаемые форматы: .cer, .p7b, .pfx'}
            </p>
          </label>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="secondary"
            onClick={() => window.open('https://www.gosuslugi.ru/Pgu/eds', '_blank')}
            className="mr-2"
          >
            Получить КЭП
          </Button>
          <Button 
            variant="primary"
            onClick={handleVerify}
            disabled={!file || isVerifying}
          >
            {isVerifying ? 'Проверка...' : 'Подтвердить личность'}
          </Button>
        </div>
        
        <div className="bg-warevision-gray p-4 rounded-lg mt-4 text-sm">
          <h3 className="font-bold text-warevision-dark-blue">Что такое КЭП?</h3>
          <p className="text-gray-600 mt-1">
            Квалифицированная электронная подпись (КЭП) — это аналог собственноручной подписи в электронном виде.
            КЭП придает документам юридическую значимость, равную бумажным документам с собственноручной подписью согласно ФЗ-63.
            Чтобы получить КЭП, обратитесь в аккредитованный удостоверяющий центр или через портал Госуслуг.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default KepUploader;
