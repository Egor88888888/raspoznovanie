import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const ConsentRevocationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    documentId: '',
    reasonForRevocation: '',
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
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Необходимо указать ФИО';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Необходимо указать email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Необходимо указать телефон';
    } else if (!/^[+]?[0-9]{10,12}$/i.test(formData.phone.replace(/\s|-/g, ''))) {
      newErrors.phone = 'Неверный формат телефона';
    }
    
    if (!formData.documentId.trim()) {
      newErrors.documentId = 'Необходимо указать номер документа';
    }
    
    if (!formData.reasonForRevocation.trim()) {
      newErrors.reasonForRevocation = 'Необходимо указать причину отзыва';
    }
    
    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо подтвердить согласие';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Имитация запроса к API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // После успешной обработки перенаправляем на страницу подтверждения
        navigate('/consent/confirmation', { 
          state: { 
            success: true,
            requestId: 'RQ-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
          } 
        });
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        setErrors({
          submit: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <Card title="Форма отзыва согласия на обработку персональных данных">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="ФИО"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Иванов Иван Иванович"
          error={errors.fullName}
          required
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@example.com"
          error={errors.email}
          required
        />
        
        <Input
          label="Телефон"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+7 (999) 123-45-67"
          error={errors.phone}
          required
        />
        
        <Input
          label="Номер документа, подтверждающего личность"
          name="documentId"
          value={formData.documentId}
          onChange={handleChange}
          placeholder="Серия и номер паспорта или другого документа"
          error={errors.documentId}
          required
        />
        
        <div className="mb-4">
          <label htmlFor="reasonForRevocation" className="block text-gray-700 font-medium mb-1">
            Причина отзыва согласия <span className="text-red-500">*</span>
          </label>
          <textarea
            id="reasonForRevocation"
            name="reasonForRevocation"
            value={formData.reasonForRevocation}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-warevision-blue border-gray-300"
            placeholder="Укажите причину отзыва согласия на обработку персональных данных"
            required
          />
          {errors.reasonForRevocation && (
            <p className="text-red-500 text-sm mt-1">{errors.reasonForRevocation}</p>
          )}
        </div>
        
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
              Я подтверждаю достоверность предоставленных данных и понимаю, что отзыв согласия на обработку персональных данных может повлечь за собой невозможность предоставления услуг
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
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить запрос'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ConsentRevocationForm;
