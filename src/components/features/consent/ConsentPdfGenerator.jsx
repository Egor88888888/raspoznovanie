import React, { useState } from 'react';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

const ConsentPdfGenerator = ({ userData, organizationData, onGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState(null);
  
  const handleGeneratePdf = async () => {
    setIsGenerating(true);
    
    try {
      // Имитация генерации PDF
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // В реальном приложении здесь был бы вызов API для генерации PDF
      // Например, использование jsPDF или API-сервиса генерации PDF
      
      // Имитация успешной генерации
      const mockPdfData = {
        url: '#', // В реальном приложении здесь был бы URL для скачивания PDF
        name: `Заявление об отзыве согласия - ${organizationData.name}.pdf`,
        generatedAt: new Date().toISOString(),
        size: '152 KB'
      };
      
      setGeneratedPdf(mockPdfData);
      
      if (onGenerated) {
        onGenerated(mockPdfData);
      }
    } catch (error) {
      console.error('Ошибка при генерации PDF:', error);
      alert('Произошла ошибка при генерации PDF. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Card title="Генерация заявления">
      <div className="space-y-4">
        <p className="text-gray-600">
          Мы подготовим юридически грамотное заявление об отзыве согласия на обработку персональных данных
          на основе предоставленной вами информации.
        </p>
        
        <div className="bg-warevision-gray p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Заявитель:</span>
            <span className="text-sm font-medium">{userData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Документ:</span>
            <span className="text-sm font-medium">{userData.documentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Организация:</span>
            <span className="text-sm font-medium">{organizationData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">ИНН/ОГРН:</span>
            <span className="text-sm font-medium">{organizationData.inn} / {organizationData.ogrn || organizationData.ogrnip}</span>
          </div>
        </div>
        
        {!generatedPdf ? (
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleGeneratePdf}
              disabled={isGenerating}
            >
              {isGenerating ? 'Создание PDF...' : 'Создать заявление об отзыве'}
            </Button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="text-3xl mr-3">📄</div>
              <div>
                <h3 className="font-medium text-warevision-dark-blue">{generatedPdf.name}</h3>
                <p className="text-sm text-gray-600">
                  Размер: {generatedPdf.size} • Создан: {new Date(generatedPdf.generatedAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" onClick={() => alert('PDF скачан')}>
                Скачать PDF
              </Button>
              <Button variant="secondary" onClick={() => alert('PDF отправлен на email')}>
                Отправить на email
              </Button>
              <Button variant="secondary" onClick={() => window.print()}>
                Распечатать
              </Button>
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg text-sm">
          <h3 className="font-bold text-warevision-dark-blue">Что дальше?</h3>
          <p className="text-gray-700 mt-1 mb-2">
            После создания заявления вам необходимо:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-gray-700">
            <li>Подписать документ электронной подписью или распечатать и подписать от руки</li>
            <li>Отправить подписанное заявление оператору персональных данных</li>
            <li>Сохранить доказательства отправки (квитанцию, уведомление о вручении)</li>
            <li>Дождаться ответа в течение 30 дней</li>
          </ol>
        </div>
      </div>
    </Card>
  );
};

export default ConsentPdfGenerator;
