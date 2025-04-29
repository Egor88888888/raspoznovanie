import React from 'react';
import Card from '../components/ui/Card';

// Импортируем фотографии
import alfiraPhoto from '../assets/images/alfira.jpeg';
import vasilyPhoto from '../assets/images/vasily.jpeg';
import egorPhoto from '../assets/images/egor.jpeg';

const AboutPage = () => {
  // Используем реальные фотографии
  const teamMembers = [
    { 
      name: 'Альфира', 
      role: 'CEO', 
      description: 'Основатель и руководитель компании, отвечает за стратегическое развитие WareVision.',
      img: alfiraPhoto
    },
    { 
      name: 'Василий', 
      role: 'CDO (Chief Data Officer)', 
      description: 'Отвечает за управление данными и разработку технологий защиты персональной информации.',
      img: vasilyPhoto
    },
    { 
      name: 'Егор', 
      role: 'CCO (Chief Commercial Officer)', 
      description: 'Руководит коммерческим направлением и развитием партнерских отношений.',
      img: egorPhoto
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-warevision-dark-blue mb-6">
        О компании WareVision
      </h1>
      
      <Card className="mb-8">
        <p className="text-gray-700 mb-4">
          WareVision — инновационная компания, специализирующаяся на разработке решений для управления и защиты данных. 
          Мы помогаем бизнесу и частным лицам безопасно управлять своими данными в цифровом мире.
        </p>
        <p className="text-gray-700">
          Наша миссия — сделать обработку персональных данных максимально прозрачной, 
          безопасной и соответствующей всем требованиям законодательства.
        </p>
      </Card>
      
      <h2 className="text-2xl font-bold mb-4">Наши ценности</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="Безопасность">
          <p className="text-gray-700">
            Мы применяем лучшие практики и технологии для обеспечения безопасности данных наших клиентов.
          </p>
        </Card>
        <Card title="Прозрачность">
          <p className="text-gray-700">
            Мы верим в полную прозрачность и предоставляем клиентам полный контроль над своими данными.
          </p>
        </Card>
        <Card title="Инновации">
          <p className="text-gray-700">
            Мы постоянно развиваем и совершенствуем наши технологии для повышения качества и безопасности.
          </p>
        </Card>
        <Card title="Соответствие">
          <p className="text-gray-700">
            Наши решения полностью соответствуют требованиям законодательства о защите персональных данных.
          </p>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Наша команда</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <Card key={index} className="text-center p-4">
            <img 
              src={member.img} 
              alt={`${member.name} - ${member.role}`} 
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-warevision-dark-blue">{member.name}</h3>
            <p className="text-gray-600 font-medium">{member.role}</p>
            <p className="text-gray-600 mt-2 text-sm">{member.description}</p>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 bg-warevision-gray p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Наши реквизиты</h2>
        <p className="text-gray-700">ООО «Вэвижн»</p>
        <p className="text-gray-700">127495, г. Москва, Долгопрудненское шоссе, д. 3 пом VII ком 22 «В»</p>
        <p className="text-gray-700">Email: <a href="mailto:info@w-vision.ru" className="text-warevision-dark-blue hover:underline">info@w-vision.ru</a></p>
        <p className="text-gray-700">Телефон: <a href="tel:+79129369269" className="text-warevision-dark-blue hover:underline">+7 (912) 936-92-69</a></p>
      </div>
    </div>
  );
};

export default AboutPage;
