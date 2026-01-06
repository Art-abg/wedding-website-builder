import { useThemeStyles } from '../../lib/useThemeStyles';
import { useThemeStore } from '../../store/themeStore';
import { HeroSection } from '../wedding/HeroSection';
import { CeremonySection } from '../wedding/CeremonySection';
import { ReceptionSection } from '../wedding/ReceptionSection';
import { WeddingPartySection } from '../wedding/WeddingPartySection';
import { TimelineSection } from '../wedding/TimelineSection';
import { TravelSection } from '../wedding/TravelSection';
import { RegistrySection } from '../wedding/RegistrySection';
import { RsvpSection } from '../wedding/RsvpSection';
import { FooterSection } from '../wedding/FooterSection';
import { cn } from '../../lib/utils';

export const PreviewCanvas = () => {
  const themeStyles = useThemeStyles();
  const { currentThemeId } = useThemeStore();
  
  return (
    <div className="flex-1 w-full h-full bg-gray-200/50 p-4 flex items-center justify-center overflow-hidden">
        <div 
        className={cn(
            "w-full h-full max-w-[1200px] shadow-2xl transition-all duration-500 ease-in-out bg-white text-text font-body isolate rounded-xl overflow-hidden flex flex-col border border-gray-300/50 ring-1 ring-black/5", 
        )}
        style={themeStyles}
        data-theme={currentThemeId}
        >
        {/* Website Content - Scrollable Area */}
        <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative">
             <HeroSection />
             <CeremonySection />
             <WeddingPartySection />
             <TimelineSection />
             <ReceptionSection />
             <TravelSection />
             <RegistrySection />
             <RsvpSection />
             <FooterSection />
        </div>
        </div>
    </div>
  );
};

