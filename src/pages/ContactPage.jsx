import React from 'react';
import ContactForm from '../components/features/ContactForm';
import Card from '../components/ui/Card';

const ContactPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold text-warevision-dark-blue mb-6">
          Связаться с нами
        </h1>
        
        <p className="text-gray-700 mb-8">
          Если у вас возникли вопросы по работе с персональными данными или вам необходима помощь, 
          пожалуйста, заполните форму ниже или свяжитесь с нами напрямую по указанным контактам.
        </p>
        
        <ContactForm />
      </div>
      
      <div className="md:col-span-1">
        <Card title="Наши контакты" className="sticky top-8">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-warevision-dark-blue">Адрес</h3>
              <p className="text-gray-700">
                ООО «Вэвижн»<br />
                127495, г. Москва, Долгопрудненское шоссе, д. 3 пом VII ком 22 «В»
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-warevision-dark-blue">Телефон</h3>
              <p className="text-gray-700">
                <a href="tel:+79129369269" className="hover:text-warevision-dark-blue">
                  +7 (912) 936-92-69
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-warevision-dark-blue">Email</h3>
              <p className="text-gray-700">
                <a href="mailto:info@w-vision.ru" className="hover:text-warevision-dark-blue">
                  info@w-vision.ru
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-warevision-dark-blue">Часы работы</h3>
              <p className="text-gray-700">
                Пн-Пт: 9:00 - 18:00<br />
                Сб-Вс: Выходной
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
