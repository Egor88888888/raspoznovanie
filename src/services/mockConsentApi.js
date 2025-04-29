// Эмуляция API для работы с отзывом согласия на обработку персональных данных

// Имитация задержки сети
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Имитация хранилища запросов
let consentRevocationRequests = [];

export const mockConsentApi = {
  // Отправка запроса на отзыв согласия
  async submitRevocationRequest(data) {
    await delay(1500); // Имитация задержки сети
    
    // Генерация уникального ID для запроса
    const requestId = 'RQ-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    
    // Создание записи о запросе
    const request = {
      id: requestId,
      ...data,
      status: 'processing',
      createdAt: new Date().toISOString(),
    };
    
    // Сохранение запроса в "базе данных"
    consentRevocationRequests.push(request);
    
    // Возвращаем ID запроса и успешный статус
    return {
      success: true,
      requestId,
      message: 'Запрос на отзыв согласия успешно создан',
    };
  },
  
  // Получение статуса запроса по ID
  async getRequestStatus(requestId) {
    await delay(800); // Имитация задержки сети
    
    // Поиск запроса по ID
    const request = consentRevocationRequests.find(req => req.id === requestId);
    
    if (!request) {
      throw new Error('Запрос не найден');
    }
    
    return {
      id: request.id,
      status: request.status,
      createdAt: request.createdAt,
      lastUpdated: request.lastUpdated || request.createdAt,
    };
  },
  
  // Получение всех запросов пользователя
  async getUserRequests(userEmail) {
    await delay(1000); // Имитация задержки сети
    
    // Поиск всех запросов пользователя по email
    const requests = consentRevocationRequests.filter(req => req.email === userEmail);
    
    return requests.map(req => ({
      id: req.id,
      status: req.status,
      createdAt: req.createdAt,
      lastUpdated: req.lastUpdated || req.createdAt,
    }));
  }
};

export default mockConsentApi;
