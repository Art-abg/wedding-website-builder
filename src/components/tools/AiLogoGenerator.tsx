import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store/themeStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/Dialog';
import { Wand2, Upload, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AiLogoGeneratorProps {
  onSelect: (logoUrl: string) => void;
  trigger?: React.ReactNode;
}

// Simulated "AI" Library
const AI_LIBRARY = {
  church: [
    { id: 'c1', url: 'https://api.iconify.design/noto:church.svg', label: 'Classic Church' },
    { id: 'c2', url: 'https://api.iconify.design/emojione:church.svg', label: 'Modern Chapel' },
    { id: 'c3', url: 'https://api.iconify.design/twemoji:church.svg', label: 'Stone Church' },
  ],
  reception: [
    { id: 'r1', url: 'https://api.iconify.design/noto:clinking-glasses.svg', label: 'Toast' },
    { id: 'r2', url: 'https://api.iconify.design/emojione:wine-glass.svg', label: 'Wine' },
    { id: 'r3', url: 'https://api.iconify.design/twemoji:party-popper.svg', label: 'Party' },
  ]
};

export const AiLogoGenerator = ({ onSelect, trigger }: AiLogoGeneratorProps) => {
  const { t } = useTranslation();
  const { getEffectiveTheme } = useThemeStore();
  const theme = getEffectiveTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogos, setGeneratedLogos] = useState<{id: string, url: string, label: string}[]>([]);
  const [step, setStep] = useState<'input' | 'processing' | 'results'>('input');
  
  const handleGenerate = () => {
    if (!prompt) return;
    setStep('processing');
    setIsGenerating(true);
    
    // Simulate AI delay
    setTimeout(() => {
      setIsGenerating(false);
      setStep('results');
      
      // Simple keyword matching simulation
      const lowerPrompt = prompt.toLowerCase();
      let results = [];
      if (lowerPrompt.includes('church') || lowerPrompt.includes('chapel')) {
        results = AI_LIBRARY.church;
      } else if (lowerPrompt.includes('party') || lowerPrompt.includes('wine') || lowerPrompt.includes('reception')) {
        results = AI_LIBRARY.reception;
      } else {
        // Mix
        results = [...AI_LIBRARY.church.slice(0, 1), ...AI_LIBRARY.reception.slice(0, 1)];
      }
      setGeneratedLogos(results);
    }, 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSelect(reader.result as string);
        setIsOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const reset = () => {
    setStep('input');
    setPrompt('');
    setGeneratedLogos([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if(!open) reset(); }}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="flex items-center gap-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
            <Wand2 className="w-3 h-3" />
            {t('actions.generate_ai', 'Generate Logo')}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-500" />
            AI Logo Studio
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div 
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Describe your venue</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Ancient Armenian stone church with cross..."
                    className="w-full h-24 p-3 border rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={handleGenerate}
                    disabled={!prompt}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-md font-medium text-sm disabled:opacity-50 hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <Wand2 className="w-4 h-4" />
                    Generate Magic
                  </button>
                  
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button className="h-full px-4 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center text-gray-700">
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'processing' && isGenerating && (
              <motion.div 
                key="processing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                 <div className="relative">
                   <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse" />
                   <Loader2 className="w-12 h-12 text-purple-600 animate-spin relative z-10" />
                 </div>
                 <p className="text-sm text-gray-500 animate-pulse">Designing your logo...</p>
                 <div className="text-xs text-gray-400">
                    Applying {theme.name} style...
                 </div>
              </motion.div>
            )}

            {step === 'results' && (
              <motion.div 
                 key="results"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="space-y-4"
              >
                 <div className="grid grid-cols-3 gap-4">
                    {generatedLogos.map((logo, idx) => (
                      <motion.button
                        key={logo.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="aspect-square rounded-lg border-2 border-transparent hover:border-purple-500 hover:bg-purple-50 p-4 flex flex-col items-center justify-center gap-2 transition-all group"
                        onClick={() => { onSelect(logo.url); setIsOpen(false); }}
                      >
                         <img src={logo.url} alt={logo.label} className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform" />
                      </motion.button>
                    ))}
                 </div>
                 <button 
                   onClick={reset}
                   className="w-full py-2 text-sm text-gray-500 hover:text-gray-900"
                 >
                   Try new prompt
                 </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};
