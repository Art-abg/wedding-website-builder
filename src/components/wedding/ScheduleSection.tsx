import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store/themeStore';
import { useContentStore } from '../../store/contentStore';
import { Clock, MapPin, Church, Wine, PartyPopper, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ScheduleSection = () => {
  const { t } = useTranslation();
  const { getEffectiveTheme } = useThemeStore();
  const { content } = useContentStore();
  const theme = getEffectiveTheme();

  if (!content.sectionVisibility.schedule || !content.schedule || content.schedule.length === 0) return null;

  const getIcon = (type: string, customLogo?: string) => {
    if (customLogo) return <img src={customLogo} alt="logo" className="w-8 h-8 object-contain" />;
    
    switch (type) {
      case 'church': return <Church className="w-6 h-6" />;
      case 'reception': return <Wine className="w-6 h-6" />;
      case 'party': return <PartyPopper className="w-6 h-6" />;
      default: return <Clock className="w-6 h-6" />;
    }
  };

  return (
    <section 
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Calendar className="w-10 h-10 mx-auto mb-4" style={{ color: theme.colors.secondary }} />
          <h2 
            className="font-heading text-4xl md:text-5xl mb-4"
            style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}
          >
            {t('sections.schedule', 'Day Schedule')}
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: theme.colors.secondary }} />
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2" 
            style={{ backgroundColor: theme.colors.border }}
          />

          <div className="space-y-12">
            {content.schedule.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Time Badge (Center) */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                   <div 
                     className="w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-md bg-white"
                     style={{ borderColor: theme.colors.secondary, color: theme.colors.primary }}
                   >
                     {getIcon(event.type, event.customLogo)}
                   </div>
                   <div 
                     className="mt-2 px-3 py-1 rounded-full text-sm font-bold shadow-sm bg-white"
                     style={{ color: theme.colors.text, border: `1px solid ${theme.colors.border}` }}
                   >
                     {event.time}
                   </div>
                </div>

                {/* Content Card */}
                <div className={cn("w-full md:w-1/2 pl-24 md:pl-0", index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left")}>
                  <div 
                    className="p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow bg-surface group"
                    style={{ 
                      borderRadius: theme.borderRadius.card,
                      borderColor: theme.colors.border,
                      backgroundColor: theme.colors.surface 
                    }}
                  >
                    <h3 
                      className="text-xl font-bold mb-2 group-hover:text-primary transition-colors"
                      style={{ fontFamily: theme.fonts.heading }}
                    >
                      {event.title}
                    </h3>
                    <div className={cn("flex items-center gap-2 mb-3 text-sm font-medium", index % 2 === 0 ? "md:justify-end" : "md:justify-start")} style={{ color: theme.colors.secondary }}>
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    {event.description && (
                      <p className="text-sm leading-relaxed" style={{ color: theme.colors.muted }}>
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Spacer for other side */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
