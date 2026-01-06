import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store/themeStore';
import { useContentStore } from '../../store/contentStore';
import { Users } from 'lucide-react';

export const WeddingPartySection = () => {
  const { t } = useTranslation();
  const { getEffectiveTheme } = useThemeStore();
  const { content } = useContentStore();
  const theme = getEffectiveTheme();

  if (!content.sectionVisibility.weddingParty || content.weddingParty.length === 0) return null;

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      kavor: t('kavor', 'Kavor (Godfather)'),
      kavort: t('kavort', 'Kavort (Godmother)'),
      bestman: t('bestman', 'Best Man'),
      bridesmaid: t('bridesmaid', 'Bridesmaid'),
      groomsman: t('groomsman', 'Groomsman'),
      other: t('party_member', 'Party Member')
    };
    return labels[role] || role;
  };

  return (
    <motion.section 
      className="py-20 px-8 text-center"
      style={{ backgroundColor: theme.colors.surface }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <Users className="w-12 h-12 mx-auto mb-6" style={{ color: theme.colors.secondary }} />
        
        <h2 
          className="font-heading text-4xl md:text-5xl mb-4"
          style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
        >
          {t('wedding_party', 'Wedding Party')}
        </h2>
        
        <p 
          className="font-accent text-2xl mb-12"
          style={{ color: theme.colors.secondary, fontFamily: theme.fonts.accent }}
        >
          {t('wedding_party_subtitle', 'Our loved ones')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.weddingParty.map((member, index) => (
            <motion.div
              key={member.id}
              className="p-6 rounded-lg shadow-sm border text-center"
              style={{ 
                backgroundColor: theme.colors.background,
                borderRadius: theme.borderRadius.card,
                borderColor: theme.colors.border
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {member.photo ? (
                <img 
                  src={member.photo} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  style={{ borderRadius: '50%' }}
                />
              ) : (
                <div 
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold"
                  style={{ 
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.surface
                  }}
                >
                  {member.name.charAt(0)}
                </div>
              )}
              
              <h3 
                className="text-xl font-bold mb-1"
                style={{ color: theme.colors.text, fontFamily: theme.fonts.heading }}
              >
                {member.name}
              </h3>
              
              <p 
                className="text-sm font-medium mb-2"
                style={{ color: theme.colors.primary }}
              >
                {getRoleLabel(member.role)}
              </p>
              
              {member.description && (
                <p className="text-sm" style={{ color: theme.colors.muted }}>
                  {member.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
