import React, { useState } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

const ManualOrganizationForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    inn: '',
    ogrn: '',
    kpp: '',
    address: '',
    type: 'ООО',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите название организации';
    }
    
    if (!formData.inn.trim()) {
      newErrors.inn = 'Введите ИНН организации';
    } else if (!/^\d{10}$|^\d{12}$/.test(formData.inn)) {
      newErrors.inn = 'ИНН должен содержать 10 или 12 цифр';
    }
    
    if (formData.type !== 'ИП') {
      if (!formData.ogrn.trim()) {
        newErrors.ogrn = 'Введите ОГРН организации';
      } else if (!/^\d{13}$/.test(formData.ogrn)) {
        newErrors.ogrn = 'ОГРН должен содержать 13 цифр';
      }
      
      if (!formData.kpp.trim()) {
        newErrors.kpp = 'Введите КПП организации';
      } else if (!/^\d{9}$/.test(formData.kpp)) {
        newErrors.kpp = 'КПП должен содержать 9 цифр';
      }
    } else {
      if (!formData.ogrn.trim()) {
        newErrors.ogrn = 'Введите ОГРНИП';
      } else if (!/^\d{15}$/.test(formData.ogrn)) {
        newErrors.ogrn = 'ОГРНИП должен содержать 15 цифр';
      }
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Введите юридический адрес';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  return (
    <Card title="Ввод реквизитов организации вручную">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Наименование организации"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ООО «Название организации»"
              error={errors.name}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Тип организации <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-warevision-blue border-gray-300"
            >
              <option value="ООО">ООО</option>
              <option value="АО">АО</option>
              <option value="ПАО">ПАО</option>
              <option value="ИП">ИП</option>
              <option value="Другое">Другое</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              label="ИНН"
              name="inn"
              value={formData.inn}
              onChange={handleChange}
              placeholder={formData.type === 'ИП' ? '12 цифр' : '10 цифр'}
              error={errors.inn}
              required
            />
          </div>
          <div>
            <Input
              label={formData.type === 'ИП' ? 'ОГРНИП' : 'ОГРН'}
              name="ogrn"
              value={formData.ogrn}
              onChange={handleChange}
              placeholder={formData.type === 'ИП' ? '15 цифр' : '13 цифр'}
              error={errors.ogrn}
              required
            />
          </div>
          {formData.type !== 'ИП' && (
            <div>
              <Input
                label="КПП"
                name="kpp"
                value={formData.kpp}
                onChange={handleChange}
                placeholder="9 цифр"
                error={errors.kpp}
                required
              />
            </div>
          )}
        </div>
        
        <Input
          label="Юридический адрес"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="127495, г. Москва, Долгопрудненское шоссе, д. 3 пом VII ком 22 «В»"
          error={errors.address}
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email для отправки заявления"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="info@example.com"
          />
          <Input
            label="Телефон организации"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+7 (___) ___-__-__"
          />
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-800">
          <p>
            <strong>Внимание!</strong> Убедитесь в правильности вводимых данных. Неверные реквизиты
            организации могут привести к тому, что ваше заявление об отзыве согласия не будет доставлено
            оператору персональных данных.
          </p>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button 
            variant="secondary"
            type="button"
            onClick={onCancel}
          >
            Отмена
          </Button>
          <Button variant="primary" type="submit">
            Сохранить организацию
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ManualOrganizationForm;
