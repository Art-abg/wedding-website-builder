import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './Dialog';
import { useState } from 'react';
import { Image, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-1645062cd95c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529636721158-485eeb556047?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
];

interface MediaLibraryProps {
  onSelect: (url: string) => void;
  trigger?: React.ReactNode;
}

export const MediaLibrary = ({ onSelect, trigger }: MediaLibraryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (url: string) => {
      setSelected(url);
      onSelect(url);
      setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
            <button className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded transition-colors group">
                <Image className="w-3.5 h-3.5" />
                <span>Select Image</span>
            </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white p-6 rounded-xl shadow-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-heading text-primary">Media Library</DialogTitle>
          <p className="text-xs text-muted-foreground text-gray-500">Select an image from your uploaded assets.</p>
        </DialogHeader>
        
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto p-1 custom-scrollbar">
            {MOCK_IMAGES.map((url, idx) => (
                <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect(url)}
                    className={cn(
                        "aspect-square rounded-lg overflow-hidden cursor-pointer relative group border-2 transition-colors",
                        selected === url ? "border-blue-500" : "border-transparent"
                    )}
                >
                    <img src={url} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Check className="text-white w-6 h-6" />
                    </div>
                </motion.div>
            ))}
            
            {/* Upload Placeholder */}
            <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-400 cursor-pointer transition-colors">
                <span className="text-2xl mb-1">+</span>
                <span className="text-[10px] font-medium uppercase tracking-wider">Upload</span>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
