import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const KepUploader = ({ onComplete }) => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError('');
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Необходимо выбрать файл КЭП');
      return;
    }
    
    setLoading(true);
    
    try {
      // Имитация проверки КЭП
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // В реальном приложении здесь был бы код для проверки КЭП через API
      const fakeKepInfo = {
        subject: 'CN=Иванов Иван Иванович, O=ООО "Компания", OU=Отдел, C=RU',
        issuer: 'CN=УЦ "ВэВижн", O=ООО "ВэВижн", C=RU',
        validFrom: new Date(),
        validTo: new Date(Date.now() + 31536000000), // +1 год
        verified: true
      };
      
      onComplete({
        success: true,
        kepInfo: fakeKepInfo
      });
      
    } catch (error) {
      console.error('Ошибка проверки КЭП:', error);
      setError('Не удалось проверить КЭП. Пожалуйста, проверьте файл и пароль.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card title="Загрузка квалифицированной электронной подписи (КЭП)">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Файл КЭП (.sig, .p12)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-warevision-blue cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="pt-1 text-sm text-gray-600">
                  {file ? file.name : 'Перетащите файл сюда или нажмите для выбора'}
                </p>
              </div>
              <input 
                type="file" 
                className="opacity-0" 
                accept=".sig,.p12,.pfx"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Пароль от КЭП (если требуется)
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-warevision-blue border-gray-300"
            placeholder="Введите пароль от контейнера КЭП"
          />
        </div>
        
        {error && (
          <div className="text-red-500 p-3 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Проверка...' : 'Проверить и применить КЭП'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default KepUploader;
