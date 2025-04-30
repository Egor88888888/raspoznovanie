import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CompanySearch = ({ onSelectCompany }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Введите название компании для поиска');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // В реальном приложении здесь был бы запрос к API ФНС или аналогичному сервису
      // Имитация запроса и ответа
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Тестовые данные
      let mockResults = [];
      
      if (searchTerm.toLowerCase().includes('вэвижн') || searchTerm.toLowerCase().includes('warevision')) {
        mockResults = [
          {
            name: 'ООО "ВЭВИЖН"',
            inn: '7701234567',
            ogrn: '1027700123456',
            kpp: '770101001',
            address: '127495, г. Москва, Долгопрудненское шоссе, д. 3 пом VII ком 22 «В»',
            director: 'Альфира',
            email: 'info@w-vision.ru',
            phone: '+7 (912) 936-92-69'
          }
        ];
      } else {
        // Генерируем несколько фиктивных результатов для демонстрации
        mockResults = [
          {
            name: `ООО "${searchTerm.toUpperCase()}",
            inn: '7702' + Math.floor(Math.random() * 1000000),
            ogrn: '10277002' + Math.floor(Math.random() * 100000),
            kpp: '77020' + Math.floor(Math.random() * 10000),
            address: '127000, г. Москва, ул. Ленина, д. ' + Math.floor(Math.random() * 100),
            director: 'Петров П.П.',
            email: 'info@example-group.com',
            phone: '+7 (800) 765-43-21'
          }
        ];
      }
      
      setResults(mockResults);
      
    } catch (error) {
      console.error('Ошибка поиска компании:', error);
      setError('Не удалось выполнить поиск. Проверьте подключение к интернету или попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelectCompany = (company) => {
    onSelectCompany(company);
  };
  
  // Обработка Enter для запуска поиска
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <Card title="Поиск компании по названию">
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Введите название компании, которой вы хотите отозвать согласие на обработку персональных данных.
          Мы автоматически заполним все необходимые реквизиты.
        </p>
        
        <div className="flex gap-2">
          <Input
            placeholder="Например: ВэВижн, Яндекс, Сбербанк"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow"
          />
          <Button
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Поиск...' : 'Найти'}
          </Button>
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
      
      {results.length > 0 && (
        <div>
          <h3 className="font-semibold text-warevision-dark-blue mb-3">
            Результаты поиска ({results.length})
          </h3>
          
          <div className="space-y-4">
            {results.map((company, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSelectCompany(company)}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-warevision-dark-blue">{company.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">ИНН: {company.inn} • ОГРН: {company.ogrn}</p>
                    <p className="text-sm text-gray-600 mt-1">{company.address}</p>
                  </div>
                  <Button size="small" variant="secondary">
                    Выбрать
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default CompanySearch;
