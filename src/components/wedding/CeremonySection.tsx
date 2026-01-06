import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store/themeStore';
import { useContentStore } from '../../store/contentStore';
import { Church, Clock, MapPin } from 'lucide-react';

export const CeremonySection = () => {
  const { t } = useTranslation();
  const { getEffectiveTheme } = useThemeStore();
  const { content } = useContentStore();
  const theme = getEffectiveTheme();

  if (!content.sectionVisibility.ceremony) return null;

  return (
    <motion.section 
      className="py-20 px-8 text-center"
      style={{ backgroundColor: theme.colors.surface }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-2xl mx-auto">
        <Church className="w-12 h-12 mx-auto mb-6" style={{ color: theme.colors.secondary }} />
        
        <h2 
          className="font-heading text-4xl md:text-5xl mb-4"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
        >
          {t('sections.ceremony', 'The Ceremony')}
        </h2>
        
        <p 
          className="font-accent text-2xl mb-8"
          style={{ color: theme.colors.secondary, fontFamily: theme.fonts.accent }}
        >
          {t('sections.ceremony_subtitle', 'Join us as we say "I do"')}
        </p>
        
        <div 
          className="p-8 rounded-lg shadow-sm"
          style={{ 
            backgroundColor: theme.colors.background,
            borderRadius: theme.borderRadius.card
          }}
        >
          <h3 
            className="text-2xl font-bold mb-2"
            style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}
          >
            {content.ceremony.churchName}
          </h3>
          
          <div className="flex items-center justify-center gap-2 mb-4 text-lg" style={{ color: theme.colors.muted }}>
            <MapPin className="w-5 h-5" />
            <span>{content.ceremony.address}</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-6 text-lg" style={{ color: theme.colors.muted }}>
            <Clock className="w-5 h-5" />
            <span>{content.ceremony.time}</span>
          </div>
          
          {content.ceremony.notes && (
            <p className="text-sm italic" style={{ color: theme.colors.muted }}>
              {content.ceremony.notes}
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
};
