import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import html2canvas from 'html2canvas';

const Index = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const emojiRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!emojiRef.current) return;
    
    try {
      const canvas = await html2canvas(emojiRef.current, {
        backgroundColor: null,
        scale: 2
      });
      
      const link = document.createElement('a');
      link.download = 'zdravo-emoji.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground animate-pulse-text">
            Анимированный смайлик
          </h1>
          <p className="text-xl text-muted-foreground">
            Мультяшный GIF "Здорово!" с эмоциями
          </p>
        </div>

        <div 
          ref={emojiRef}
          className="relative bg-white rounded-3xl shadow-2xl p-16 inline-block"
        >
          <div className="flex flex-col items-center gap-8">
            <div className={`text-9xl ${isAnimating ? 'animate-bounce-emoji' : ''}`}>
              😃
            </div>
            
            <div className="relative">
              <div className={`text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent ${isAnimating ? 'animate-wiggle' : ''}`}>
                Здорово!
              </div>
              <div className="absolute -top-2 -right-2 text-4xl animate-pulse">
                ✨
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            size="lg"
            onClick={handleDownload}
            className="text-lg px-8 py-6"
          >
            <Icon name="Download" className="mr-2" size={24} />
            Скачать картинку
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsAnimating(!isAnimating)}
            className="text-lg px-8 py-6"
          >
            <Icon name={isAnimating ? "Pause" : "Play"} className="mr-2" size={24} />
            {isAnimating ? 'Остановить' : 'Запустить'}
          </Button>
        </div>

        <div className="bg-white/50 backdrop-blur rounded-xl p-6 text-left space-y-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Icon name="Info" size={20} />
            Возможности:
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Плавная анимация смены эмоций смайлика</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">✓</span>
              <span>Текст "Здорово!" с забавным покачиванием</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">✓</span>
              <span>Скачивание готового изображения в один клик</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
