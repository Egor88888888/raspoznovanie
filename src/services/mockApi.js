
// Эта утилита имитирует работу API для разработки
// В реальном проекте здесь будут вызовы к реальному API

// Имитация задержки сети
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Начальные данные
let tasks = [
  { id: 1, title: 'Создать MVP', completed: true },
  { id: 2, title: 'Добавить авторизацию', completed: false },
  { id: 3, title: 'Провести тестирование', completed: false },
];

let nextId = 4;

// Mock API для задач
export const mockTasksApi = {
  // Получить все задачи
  async getTasks() {
    await delay(500); // Имитация задержки сети
    return [...tasks]; // Возвращаем копию массива
  },
  
  // Добавить задачу
  async addTask(title) {
    await delay(500);
    const newTask = { id: nextId++, title, completed: false };
    tasks = [...tasks, newTask];
    return newTask;
  },
  
  // Обновить задачу
  async updateTask(id, updates) {
    await delay(500);
    tasks = tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    );
    return tasks.find(task => task.id === id);
  },
  
  // Удалить задачу
  async deleteTask(id) {
    await delay(500);
    const taskToDelete = tasks.find(task => task.id === id);
    tasks = tasks.filter(task => task.id !== id);
    return taskToDelete;
  }
};

// Статистические данные (для имитации аналитики)
export const mockStatsApi = {
  async getStats() {
    await delay(700);
    return [
      { title: 'Пользователи', value: '1,243', change: '+12%', positive: true },
      { title: 'Сессии', value: '5,678', change: '+24%', positive: true },
      { title: 'Конверсия', value: '3.2%', change: '-0.5%', positive: false },
      { title: 'Доход', value: '$12,390', change: '+18%', positive: true },
    ];
  }
};

// Аутентификация (имитация)
export const mockAuthApi = {
  async login(email, password) {
    await delay(800);
    // Простая проверка - в реальном приложении здесь будет настоящая авторизация
    if (email === 'user@example.com' && password === 'password') {
      const token = 'mock-jwt-token-' + Math.random().toString(36).slice(2);
      return { 
        success: true, 
        user: { id: 1, name: 'Тестовый пользователь', email },
        token 
      };
    }
    // Имитация ошибки
    throw new Error('Неверный email или пароль');
  },
  
  async register(name, email, password) {
    await delay(1000);
    // Имитация регистрации
    return { 
      success: true, 
      message: 'Регистрация успешна',
      user: { id: 999, name, email }
    };
  }
};
