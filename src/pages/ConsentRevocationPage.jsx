import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsentRevocationForm from '../components/features/ConsentRevocationForm';
import VerificationMethodSelector from '../components/features/verification/VerificationMethodSelector';
import KepUploader from '../components/features/verification/KepUploader';
import BankIdVerification from '../components/features/verification/BankIdVerification';
import OrganizationFinder from '../components/features/organization/OrganizationFinder';
import ManualOrganizationForm from '../components/features/organization/ManualOrganizationForm';
import ConsentPdfGenerator from '../components/features/consent/ConsentPdfGenerator';
import PremiumFeatures from '../components/features/premium/PremiumFeatures';
import DataLeakMonitoring from '../components/features/premium/DataLeakMonitoring';
import Button from '../components/ui/Button';

const ConsentRevocationPage = () => {
  const navigate = useNavigate();
  
  // Состояния для хранения данных пользователя и организации
  const [userData, setUserData] = useState(null);
  const [verificationMethod, setVerificationMethod] = useState(null);
  const [verificationData, setVerificationData] = useState(null);
  const [organizationData, setOrganizationData] = useState(null);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [isManualOrgForm, setIsManualOrgForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPremiumFeature, setSelectedPremiumFeature] = useState(null);
  
  // Обработчики шагов
  const handleUserDataSubmit = (data) => {
    setUserData(data);
    setCurrentStep(2);
  };
  
  const handleVerificationMethodSelect = (method) => {
    setVerificationMethod(method);
  };
  
  const handleVerificationComplete = (data) => {
    setVerificationData(data);
    setCurrentStep(3);
  };
  
  const handleSelectOrganization = (org) => {
    if (org.manual) {
      setIsManualOrgForm(true);
    } else {
      setOrganizationData(org);
      setCurrentStep(4);
    }
  };
  
  const handleManualOrgSubmit = (data) => {
    setOrganizationData(data);
    setIsManualOrgForm(false);
    setCurrentStep(4);
  };
  
  const handlePdfGenerated = (data) => {
    setPdfGenerated(true);
  };
  
  const handlePremiumFeatureSelect = (feature) => {
    setSelectedPremiumFeature(feature.id);
  };
  
  const handleCompleteProcess = () => {
    navigate('/consent/confirmation', {
      state: {
        success: true,
        requestId: 'RQ-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
        pdf: true
      }
    });
  };
  
  // Рендеринг текущего шага
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ConsentRevocationForm 
            onSubmit={handleUserDataSubmit} 
            initialData={userData}
          />
        );
      
      case 2:
        return (
          <div>
            <div className="mb-8">
              <VerificationMethodSelector onSelect={handleVerificationMethodSelect} />
            </div>
            
            {verificationMethod === 'kep' && (
              <KepUploader onComplete={handleVerificationComplete} />
            )}
            
            {verificationMethod === 'bankid' && (
              <BankIdVerification onComplete={handleVerificationComplete} />
            )}
            
            {verificationMethod && !['kep', 'bankid'].includes(verificationMethod) && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-700">
                  Выбранный метод верификации ещё не доступен в системе. Пожалуйста, выберите другой способ.
                </p>
              </div>
            )}
          </div>
        );
      
      case 3:
        return isManualOrgForm ? (
          <ManualOrganizationForm 
            onSave={handleManualOrgSubmit} 
            onCancel={() => setIsManualOrgForm(false)}
          />
        ) : (
          <OrganizationFinder onSelectOrganization={handleSelectOrganization} />
        );
      
      case 4:
        return (
          <ConsentPdfGenerator 
            userData={userData} 
            organizationData={organizationData}
            onGenerated={handlePdfGenerated}
          />
        );
      
      case 5:
        return selectedPremiumFeature === 'leak-monitoring' ? (
          <DataLeakMonitoring />
        ) : (
          <PremiumFeatures onSelectFeature={handlePremiumFeatureSelect} />
        );
      
      default:
        return <p>Неизвестный шаг</p>;
    }
  };
  
  const getStepTitle = (step) => {
    switch (step) {
      case 1: return 'Ваши данные';
      case 2: return 'Подтверждение личности';
      case 3: return 'Выбор организации';
      case 4: return 'Создание заявления';
      case 5: return 'Дополнительные возможности';
      default: return 'Шаг';
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-warevision-dark-blue mb-6">
        Отзыв согласия на обработку персональных данных
      </h1>
      
      {/* Прогресс-бар */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step}
              className={`text-sm font-medium ${
                currentStep >= step ? 'text-warevision-dark-blue' : 'text-gray-400'
              }`}
            >
              {getStepTitle(step)}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-warevision-dark-blue rounded-full transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 25}%` }}
          />
        </div>
      </div>
      
      {/* Текущий шаг */}
      {renderCurrentStep()}
      
      {/* Кнопки навигации */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="secondary"
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
        >
          Назад
        </Button>
        
        {currentStep < 5 && (
          <Button
            variant="primary"
            onClick={() => {
              if (currentStep === 4 && pdfGenerated) {
                setCurrentStep(5);
              } else if (
                (currentStep === 2 && verificationData) ||
                (currentStep === 3 && organizationData && !isManualOrgForm)
              ) {
                setCurrentStep(currentStep + 1);
              }
            }}
            disabled={
              (currentStep === 2 && !verificationData) ||
              (currentStep === 3 && (!organizationData || isManualOrgForm)) ||
              (currentStep === 4 && !pdfGenerated)
            }
          >
            Продолжить
          </Button>
        )}
        
        {currentStep === 5 && (
          <Button
            variant="primary"
            onClick={handleCompleteProcess}
          >
            Завершить процесс
          </Button>
        )}
      </div>
      
      <div className="mt-8 bg-warevision-gray p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Важное примечание</h2>
        <p className="text-gray-700">
          Отзыв согласия на обработку персональных данных приведет к удалению вашей учетной записи и 
          всех связанных с ней данных из систем оператора. Вы больше не сможете пользоваться услугами без 
          предоставления персональных данных повторно. Если у вас есть вопросы, пожалуйста, свяжитесь с нашей
          службой поддержки по электронной почте: <a href="mailto:info@w-vision.ru" className="text-warevision-dark-blue hover:underline">info@w-vision.ru</a>
        </p>
      </div>
    </div>
  );
};

export default ConsentRevocationPage;
