
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { mockTasksApi, mockStatsApi } from '../services/mockApi';

const DashboardPage = () => {
  // Состояние для данных
  const [stats, setStats] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Загружаем статистику и задачи параллельно
        const [statsData, tasksData] = await Promise.all([
          mockStatsApi.getStats(),
          mockTasksApi.getTasks()
        ]);
        
        setStats(statsData);
        setTasks(tasksData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Добавление новой задачи
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const addedTask = await mockTasksApi.addTask(newTask);
        setTasks([...tasks, addedTask]);
        setNewTask('');
      } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
      }
    }
  };
  
  // Переключение статуса задачи
  const toggleTask = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      const updatedTask = await mockTasksApi.updateTask(id, { 
        completed: !task.completed 
      });
      
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };
  
  // Удаление задачи
  const deleteTask = async (id) => {
    try {
      await mockTasksApi.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };
  
  // Показываем индикатор загрузки
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Загрузка данных...</div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Панель управления
      </h1>
      
      {/* Карточки со статистикой */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <div className={`mt-1 flex items-center \${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
              <span>{stat.change}</span>
              <span className="ml-1 text-xs">за месяц</span>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Управление задачами */}
      <Card title="Задачи проекта" className="mb-6">
        <div className="flex mb-4">
          <Input 
            placeholder="Добавить новую задачу..." 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="mr-2"
          />
          <Button onClick={addTask}>Добавить</Button>
        </div>
        
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Нет задач для отображения</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {tasks.map(task => (
              <li key={task.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                  />
                  <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.title}
                  </span>
                </div>
                <Button 
                  variant="danger" 
                  size="small" 
                  onClick={() => deleteTask(task.id)}
                >
                  Удалить
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
      
      {/* График активности (заглушка) */}
      <Card title="Активность проекта">
        <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
          <p className="text-gray-500">Здесь будет график активности</p>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;