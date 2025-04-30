import React, { useState } from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

const DataLeakMonitoring = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState(null);
  
  const handleCheck = async () => {
    if (!email && !phone) {
      alert('Введите email или телефон для проверки');
      return;
    }
    
    setIsChecking(true);
    
    try {
      // Имитация проверки
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Имитация результатов для демонстрации
      const mockLeaks = generateMockLeaks();
      setResults(mockLeaks);
    } catch (error) {
      console.error('Ошибка при проверке данных:', error);
    } finally {
      setIsChecking(false);
    }
  };
  
  const generateMockLeaks = () => {
    // Генерация случайных результатов для демонстрации
    const leakCount = Math.floor(Math.random() * 4); // От 0 до 3 утечек
    
    if (leakCount === 0) {
      return { found: false, leaks: [] };
    }
    
    const possibleSources = [
      'AliExpress', 'Facebook', 'LinkedIn', 'Yahoo', 'Dropbox', 
      'Adobe', 'Twitter', 'VK', 'Delivery Club', 'Yandex'
    ];
    
    const possibleData = [
      'Email', 'Телефон', 'Имя', 'Пароль (хеш)', 'Дата рождения', 
      'Адрес', 'IP-адрес', 'История покупок', 'Файлы cookie'
    ];
    
    const leaks = [];
    
    for (let i = 0; i < leakCount; i++) {
      const randomSource = possibleSources[Math.floor(Math.random() * possibleSources.length)];
      const leakedDataCount = Math.floor(Math.random() * 3) + 1; // От 1 до 3 типов данных
      const leakedData = [];
      
      for (let j = 0; j < leakedDataCount; j++) {
        const dataType = possibleData[Math.floor(Math.random() * possibleData.length)];
        if (!leakedData.includes(dataType)) {
          leakedData.push(dataType);
        }
      }
      
      // Генерация случайной даты в пределах последних 3 лет
      const leakDate = new Date();
      leakDate.setFullYear(leakDate.getFullYear() - Math.floor(Math.random() * 3));
      leakDate.setMonth(Math.floor(Math.random() * 12));
      leakDate.setDate(Math.floor(Math.random() * 28) + 1);
      
      leaks.push({
        source: randomSource,
        data: leakedData,
        date: leakDate.toISOString().split('T')[0],
        severity: Math.floor(Math.random() * 3) + 1 // От 1 до 3 (низкая, средняя, высокая)
      });
    }
    
    return { found: true, leaks };
  };
  
  const getSeverityText = (severity) => {
    switch (severity) {
      case 1: return { text: 'Низкая', color: 'text-yellow-500' };
      case 2: return { text: 'Средняя', color: 'text-orange-500' };
      case 3: return { text: 'Высокая', color: 'text-red-500' };
      default: return { text: 'Неизвестно', color: 'text-gray-500' };
    }
  };
  
  return (
    <Card title="Мониторинг утечек данных">
      <div className="space-y-4">
        <p className="text-gray-600">
          Проверьте, не попали ли ваши личные данные в открытые базы утечек. 
          Введите email или телефон для проверки.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          />
          <Input
            label="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={handleCheck}
            disabled={isChecking}
          >
            {isChecking ? 'Проверка...' : 'Проверить данные'}
          </Button>
        </div>
        
        {results && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-warevision-dark-blue mb-4">Результаты проверки:</h3>
            
            {!results.found ? (
              <div className="bg-green-50 p-4 rounded-lg flex items-start">
                <div className="text-green-500 text-xl mr-3">✓</div>
                <div>
                  <p className="font-medium text-green-700">Ваши данные не найдены в утечках</p>
                  <p className="text-sm text-green-600 mt-1">
                    Мы не обнаружили ваших данных в проверяемых базах утечек. Это хороший знак, но
                    рекомендуем регулярно проверять свои данные на безопасность.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="font-medium text-red-700">
                    Обнаружено {results.leaks.length} утечек с вашими данными
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    Мы обнаружили, что ваши личные данные присутствуют в базах утечек. 
                    Рекомендуем сменить пароли и проверить подозрительную активность.
                  </p>
                </div>
                
                <div className="space-y-3">
                  {results.leaks.map((leak, index) => {
                    const severity = getSeverityText(leak.severity);
                    
                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{leak.source}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              Дата утечки: {leak.date}
                            </p>
                            <p className="text-sm text-gray-600">
                              Утечка затронула: {leak.data.join(', ')}
                            </p>
                          </div>
                          <div className={`font-medium ${severity.color}`}>
                            {severity.text} угроза
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-warevision-dark-blue">Рекомендации по защите:</h4>
                  <ul className="text-sm text-blue-800 mt-2 list-disc list-inside space-y-1">
                    <li>Смените пароли на всех сервисах, где вы используете тот же пароль</li>
                    <li>Включите двухфакторную аутентификацию на важных аккаунтах</li>
                    <li>Используйте уникальные сложные пароли для каждого сервиса</li>
                    <li>Регулярно проверяйте историю входов в ваши аккаунты</li>
                    <li>Подключите уведомления о подозрительных входах</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="bg-warevision-gray p-4 rounded-lg mt-4 text-sm">
          <h3 className="font-bold text-warevision-dark-blue">Как работает мониторинг?</h3>
          <p className="text-gray-600 mt-1">
            Наш сервис проверяет ваши данные по базам известных утечек. Мы используем 
            защищенные хеш-функции для проверки, не передавая ваши данные третьим лицам.
            Регулярные проверки помогут вам оперативно реагировать на новые утечки.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DataLeakMonitoring;
