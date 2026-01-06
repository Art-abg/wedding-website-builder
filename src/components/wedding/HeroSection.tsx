import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store/themeStore';
import { Calendar, MapPin } from 'lucide-react';
import { useContentStore } from '../../store/contentStore';

export const HeroSection = () => {
  const { t } = useTranslation();
  const { getEffectiveTheme } = useThemeStore();
  const { content } = useContentStore();
  const theme = getEffectiveTheme();
  
  // Use hero config from store, fall back to theme defaults if needed
  const { headline, subheadline, backgroundImage, layoutMode } = content.hero;
  const { date, location } = content;

  // Prioritize store layout mode over theme preset if user changed it in editor, 
  // OR just use content.hero.layoutMode as the single source of truth? 
  // Valid strategy: Initialize store with theme default, then let user override.
  // For now, let's trust content.hero.layoutMode as the primary driver.
  // Use layout from sectionLayouts, fallback to hero.layoutMode for legacy/default
  const layout = content.sectionLayouts?.hero || layoutMode; 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.8 } }
  };

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  if (layout === 'cover') {
    return (
      <motion.section 
        className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            style={{ y }}
            src={backgroundImage} 
            alt="Wedding Couple" 
            className="w-full h-[120%] object-cover -mt-[10%]" 
          />
          <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
        </div>
        
        <motion.div className="relative z-10 space-y-6 px-4" variants={textVariants}>
          <h1 className="font-heading text-6xl md:text-8xl text-white drop-shadow-lg">
            {headline}
          </h1>
          <div className="space-y-2 text-white/90 font-body text-xl tracking-wide uppercase">
            <div className="flex items-center justify-center gap-2">
               <Calendar className="w-5 h-5" />
               <span>{date}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
               <MapPin className="w-5 h-5" />
               <span>{location}</span>
            </div>
          </div>
          <motion.button 
             whileHover={{ scale: 1.05 }}
             className="mt-8 px-8 py-3 bg-secondary text-white font-medium text-lg rounded-button shadow-lg hover:brightness-110 transition-all"
             style={{ borderRadius: theme.borderRadius.button }} // Explicitly using js variable for radius if configured in tailwind as generic
          >
            {t('rsvp')}
          </motion.button>
        </motion.div>
      </motion.section>
    );
  }

  if (layout === 'split') {
    return (
      <motion.section 
        className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] w-full overflow-hidden"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
      >
        <div className="relative h-[50vh] md:h-full w-full">
             <img src={backgroundImage} alt="Wedding Couple" className="w-full h-full object-cover" />
        </div>
        
        <div className="bg-background flex flex-col items-center justify-center p-12 text-center h-full">
            <motion.div className="space-y-8" variants={textVariants}>
                <p className="font-accent text-4xl text-secondary">{subheadline}</p>
                <h1 className="font-heading text-5xl md:text-7xl text-primary leading-tight">
                    {headline}
                </h1>
                <div className="w-16 h-1 bg-secondary mx-auto" />
                <div className="font-body text-muted text-lg space-y-1">
                    <p>{date}</p>
                    <p>{location}</p>
                </div>
                 <motion.button 
                    whileHover={{ scale: 1.05 }}
                    className="mt-4 px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 rounded-button"
                 >
                    {t('sections.rsvp', 'RSVP')}
                 </motion.button>
            </motion.div>
        </div>
      </motion.section>
    );
  }

  // Centered (Default)
  return (
    <motion.section 
      className="bg-background min-h-[70vh] w-full flex flex-col items-center justify-center text-center p-8 py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
    >
        {/* Decorative background elements could go here based on theme */}
        <motion.div className="max-w-3xl space-y-8 relative z-10" variants={textVariants}>
            <p className="font-accent text-5xl md:text-6xl text-secondary mb-4">{subheadline}</p>
            <h1 className="font-heading text-6xl md:text-8xl text-primary">
                {headline}
            </h1>
            
            <div className="py-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-lg md:text-2xl text-text font-light tracking-widest font-body">
                <span>{date}</span>
                <span className="w-2 h-2 rounded-full bg-secondary hidden md:block"></span>
                <span>{location}</span>
            </div>

            <div className="pt-8">
                 <motion.button 
                    whileHover={{ scale: 1.05 }}
                    className="px-8 py-3 bg-primary text-white text-lg rounded-button shadow-md"
                 >
                    {t('sections.rsvp', 'RSVP')}
                 </motion.button>
            </div>
        </motion.div>
    </motion.section>
  );
};
