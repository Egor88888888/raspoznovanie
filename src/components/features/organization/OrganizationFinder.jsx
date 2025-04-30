import React, { useState } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

const OrganizationFinder = ({ onSelectOrganization }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [selectedOrg, setSelectedOrg] = useState(null);
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Введите название организации для поиска');
      return;
    }
    
    setIsSearching(true);
    setError('');
    
    try {
      // Имитация запроса к API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Имитация результатов поиска для демонстрации
      // В реальном проекте здесь был бы запрос к API ЕГРЮЛ/ЕГРИП
      const mockResults = generateMockResults(searchTerm);
      setResults(mockResults);
      
      if (mockResults.length === 0) {
        setError('Организации не найдены. Проверьте правильность написания или попробуйте уточнить запрос.');
      }
    } catch (err) {
      setError('Произошла ошибка при поиске организации. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSearching(false);
    }
  };
  
  const generateMockResults = (term) => {
    // Генерируем правдоподобные результаты для демонстрации
    const mockData = [
      {
        name: `ООО "${term.toUpperCase()}"`,
        inn: '7701' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
        ogrn: '1027700' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
        kpp: '770101' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        address: '127495, г. Москва, Долгопрудненское шоссе, д. ' + Math.floor(Math.random() * 200 + 1),
        type: 'ООО'
      },
      {
        name: `АО "${term.toUpperCase()}"`,
        inn: '7702' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
        ogrn: '1027700' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
        kpp: '770201' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        address: '127495, г. Москва, ул. Ленина, д. ' + Math.floor(Math.random() * 100 + 1),
        type: 'АО'
      },
      {
        name: `ИП ${term.toUpperCase()} И.О.`,
        inn: '5403' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
        ogrnip: '32477460' + Math.floor(Math.random() * 10000000).toString().padStart(7, '0'),
        address: 'г. Новосибирск, ул. Советская, д. ' + Math.floor(Math.random() * 150 + 1),
        type: 'ИП'
      }
    ];
    
    // Возвращаем 0-3 результата в зависимости от запроса
    return mockData.slice(0, Math.floor(Math.random() * 3) + 1);
  };
  
  const handleSelectOrganization = (org) => {
    setSelectedOrg(org);
  };
  
  const handleConfirmSelection = () => {
    if (selectedOrg) {
      onSelectOrganization(selectedOrg);
    }
  };
  
  return (
    <Card title="Поиск организации">
      <div className="space-y-4">
        <p className="text-gray-600">
          Введите название организации, у которой вы хотите отозвать согласие на обработку персональных данных.
          Мы найдем ее реквизиты автоматически.
        </p>
        
        <div className="flex">
          <div className="flex-grow mr-2">
            <Input
              placeholder="Введите название организации или ИНН"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={isSearching}
          >
            {isSearching ? 'Поиск...' : 'Найти'}
          </Button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-warevision-dark-blue">Результаты поиска:</h3>
            
            <div className="space-y-3">
              {results.map((org, index) => (
                <div 
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer hover:border-warevision-dark-blue transition-colors ${
                    selectedOrg === org ? 'border-warevision-dark-blue bg-blue-50' : ''
                  }`}
                  onClick={() => handleSelectOrganization(org)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{org.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        ИНН: {org.inn} {org.type !== 'ИП' ? `КПП: ${org.kpp}` : ''}
                      </p>
                      <p className="text-sm text-gray-600">
                        {org.type !== 'ИП' ? `ОГРН: ${org.ogrn}` : `ОГРНИП: ${org.ogrnip}`}
                      </p>
                      <p className="text-sm text-gray-600">{org.address}</p>
                    </div>
                    <div className="bg-gray-100 text-xs px-2 py-1 rounded">
                      {org.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="primary"
                disabled={!selectedOrg}
                onClick={handleConfirmSelection}
              >
                Выбрать организацию
              </Button>
            </div>
          </div>
        )}
        
        <div className="bg-warevision-gray p-4 rounded-lg mt-2 text-sm">
          <h3 className="font-bold text-warevision-dark-blue">Не нашли организацию?</h3>
          <p className="text-gray-600 mt-1">
            Если вы не нашли нужную организацию, вы можете добавить данные об организации вручную.
            Для этого нажмите на кнопку "Добавить вручную" и заполните необходимые поля.
          </p>
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => onSelectOrganization({ manual: true })}
          >
            Добавить вручную
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationFinder;
