import { useThemeStore } from '../../store/themeStore';
import { useContentStore } from '../../store/contentStore';
import { Heart } from 'lucide-react';

export const FooterSection = () => {
  const { getEffectiveTheme } = useThemeStore();
  const { content } = useContentStore();
  const theme = getEffectiveTheme();

  return (
    <footer 
      className="py-16 px-8 text-center"
      style={{ backgroundColor: theme.colors.primary }}
    >
      <div className="max-w-2xl mx-auto">
        <Heart 
          className="w-8 h-8 mx-auto mb-6" 
          style={{ color: theme.colors.secondary }}
          fill={theme.colors.secondary}
        />
        
        <p 
          className="font-accent text-3xl md:text-4xl mb-4"
          style={{ color: theme.colors.surface, fontFamily: theme.fonts.accent }}
        >
          {content.blessing}
        </p>
        
        <p 
          className="text-lg mb-8"
          style={{ color: theme.colors.surface, opacity: 0.8, fontFamily: theme.fonts.body }}
        >
          {content.names}
        </p>
        
        <div 
          className="text-sm"
          style={{ color: theme.colors.surface, opacity: 0.6 }}
        >
          <p>Made with love • WedBuilder Pro</p>
        </div>
      </div>
    </footer>
  );
};
