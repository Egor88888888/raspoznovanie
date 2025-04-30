import React, { useState } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

const SubscriptionModal = ({ feature, onClose, onSubscribe }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    email: '',
    agreement: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Очищаем ошибку при изменении
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Введите номер карты';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Номер карты должен содержать 16 цифр';
    }
    
    if (!formData.expiry.trim()) {
      newErrors.expiry = 'Введите срок действия карты';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = 'Срок должен быть в формате MM/YY';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'Введите CVV код';
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV код должен содержать 3 цифры';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя держателя карты';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласиться с условиями оплаты';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Имитация запроса к API для оплаты
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Успешная оплата
        onSubscribe({
          feature,
          subscriptionId: 'sub_' + Math.random().toString(36).substring(2, 10),
          activatedAt: new Date().toISOString()
        });
      } catch (error) {
        setErrors({
          submit: 'Произошла ошибка при обработке платежа. Пожалуйста, проверьте данные карты и попробуйте снова.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-warevision-dark-blue">
              Подключение {feature?.title || 'премиум функции'}
            </h2>
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="bg-warevision-gray p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{feature?.title || 'Премиум функция'}</p>
                <p className="text-sm text-gray-600">{feature?.description || 'Дополнительные возможности'}</p>
              </div>
              <div className="text-warevision-dark-blue font-bold">
                {feature?.price || 399} ₽/{feature?.period || 'месяц'}
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Номер карты"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              error={errors.cardNumber}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Срок действия"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                error={errors.expiry}
                required
              />
              
              <Input
                label="CVV"
                name="cvv"
                type="password"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="***"
                error={errors.cvv}
                required
              />
            </div>
            
            <Input
              label="Имя на карте"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="IVAN IVANOV"
              error={errors.name}
              required
            />
            
            <Input
              label="Email для чеков"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              error={errors.email}
              required
            />
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreement"
                  name="agreement"
                  type="checkbox"
                  checked={formData.agreement}
                  onChange={handleChange}
                  className="h-4 w-4 text-warevision-dark-blue focus:ring-warevision-blue border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreement" className="text-gray-700">
                  Я согласен с условиями оферты и даю согласие на регулярное списание денежных средств
                </label>
                {errors.agreement && (
                  <p className="text-red-500 text-sm mt-1">{errors.agreement}</p>
                )}
              </div>
            </div>
            
            {errors.submit && (
              <div className="text-red-500 p-3 bg-red-50 rounded-md">
                {errors.submit}
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <Button
                variant="secondary"
                type="button"
                onClick={onClose}
                className="mr-2"
              >
                Отмена
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Обработка...' : 'Оплатить'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Безопасная оплата с помощью защищенного соединения</p>
            <div className="flex justify-center items-center mt-2 space-x-2">
              <span>🔒</span>
              <span>VISA</span>
              <span>MasterCard</span>
              <span>МИР</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
