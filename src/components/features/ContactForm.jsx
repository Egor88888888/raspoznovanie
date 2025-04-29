import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    agreement: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
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
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Необходимо написать сообщение';
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
        
        // Успешная отправка
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: '',
          agreement: false
        });
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        setErrors({
          submit: 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  if (submitSuccess) {
    return (
      <Card>
        <div className="text-center py-6">
          <div className="text-green-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-16 w-16 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-warevision-dark-blue mb-2">Сообщение успешно отправлено!</h3>
          <p className="text-gray-600 mb-4">
            Спасибо за ваше обращение. Наши специалисты свяжутся с вами в ближайшее время.
          </p>
          <Button variant="primary" onClick={() => setSubmitSuccess(false)}>
            Отправить еще сообщение
          </Button>
        </div>
      </Card>
    );
  }
  
  return (
    <Card title="Связаться с нами">
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
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
            Сообщение <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-warevision-blue border-gray-300"
            placeholder="Введите ваше сообщение"
            required
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
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
              Я согласен на обработку моих персональных данных в соответствии с{' '}
              <Link to="/privacy" className="text-warevision-dark-blue hover:underline">
                Политикой конфиденциальности
              </Link>
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
            {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;
