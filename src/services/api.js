import axios from 'axios';
import { mockTasksApi, mockStatsApi, mockAuthApi } from './mockApi';

// Проверяем, используем ли мы мок API из переменной окружения
const useMockApi = process.env.REACT_APP_USE_MOCK_API === 'true';

// Базовый URL из переменной окружения
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

// Создаем экземпляр axios с настройками
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик для добавления токена авторизации
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Перехватчик для обработки ответов
axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    // Обработка ошибок
    if (error.response && error.response.status === 401) {
      // Действия при ошибке авторизации
      console.log('Ошибка авторизации');
    }
    return Promise.reject(error);
  }
);

// Реальные API методы
const realApi = {
  // Методы для работы с задачами
  tasks: {
    getTasks: () => axiosInstance.get('/tasks'),
    addTask: (title) => axiosInstance.post('/tasks', { title }),
    updateTask: (id, updates) => axiosInstance.put(`/tasks/${id}`, updates),
    deleteTask: (id) => axiosInstance.delete(`/tasks/${id}`),
  },
  
  // Методы для работы со статистикой
  stats: {
    getStats: () => axiosInstance.get('/stats'),
  },
  
  // Методы аутентификации
  auth: {
    login: (email, password) => axiosInstance.post('/auth/login', { email, password }),
    register: (name, email, password) => 
      axiosInstance.post('/auth/register', { name, email, password }),
  }
};

// Экспортируем либо моковое API, либо реальное в зависимости от настройки
export const api = {
  tasks: useMockApi ? mockTasksApi : realApi.tasks,
  stats: useMockApi ? mockStatsApi : realApi.stats,
  auth: useMockApi ? mockAuthApi : realApi.auth,
};

export default api;
