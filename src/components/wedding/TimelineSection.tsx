import { useContentStore } from '../../store/contentStore';
import { useThemeStore } from '../../store/themeStore';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

export const TimelineSection = () => {
    const { content } = useContentStore();
    const { getEffectiveTheme } = useThemeStore();
    const { t } = useTranslation();
    const theme = getEffectiveTheme();
    const layout = theme.layout.timeline;
    
    // Spacing configuration map
    const spacingMap = {
        compact: 'py-12 gap-8',
        standard: 'py-24 gap-16',
        relaxed: 'py-32 gap-24'
    };
    const sectionSpacing = spacingMap[theme.layout.sectionSpacing];

    return (
        <section className={cn("px-4 md:px-12 bg-surface text-text overflow-hidden", sectionSpacing)}>
            <div className="max-w-6xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="font-heading text-4xl md:text-5xl text-primary">
                        {t('our_story')}
                    </h2>
                    <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
                </motion.div>

                {/* Vertical Layout (Classic) */}
                {layout === 'vertical' && (
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 md:translate-x-0" />
                        <div className="space-y-12">
                            {content.story.map((event, index) => (
                                <motion.div 
                                    key={event.id}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5 }}
                                    className={cn(
                                        "relative flex flex-col md:flex-row items-center gap-8 md:gap-16",
                                        index % 2 === 1 && "md:flex-row-reverse"
                                    )}
                                >
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary ring-4 ring-background z-10" />
                                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:text-right">
                                        <div className={cn("bg-background p-6 shadow-sm border border-border relative group", index % 2 === 1 && "md:text-left")}
                                             style={{ borderRadius: theme.borderRadius.card }}>
                                            <div className="mb-2 font-accent text-xl text-secondary">{event.year}</div>
                                            <h3 className="font-heading text-xl md:text-2xl text-primary mb-2">{event.title}</h3>
                                            <p className="font-body text-muted">{event.description}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block w-1/2" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ZigZag Layout (Modern / Boho) */}
                {layout === 'zigzag' && (
                    <div className="space-y-24">
                        {content.story.map((event, index) => (
                            <motion.div 
                                key={event.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={cn(
                                    "flex flex-col md:flex-row items-center gap-12",
                                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                                )}
                            >
                                <div className="w-full md:w-1/2">
                                     {event.image ? (
                                        <div className="overflow-hidden shadow-xl" style={{ borderRadius: theme.borderRadius.image }}>
                                            <img src={event.image} alt={event.title} className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700" />
                                        </div>
                                     ) : (
                                         <div className="h-80 bg-gray-100 flex items-center justify-center text-gray-300" style={{ borderRadius: theme.borderRadius.image }}>
                                             No Image
                                         </div>
                                     )}
                                </div>
                                <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                                    <div className="inline-block px-4 py-1 bg-secondary/10 text-secondary font-bold rounded-full text-sm">
                                        {event.year}
                                    </div>
                                    <h3 className="font-heading text-4xl text-primary">{event.title}</h3>
                                    <p className="font-body text-lg text-muted leading-relaxed">{event.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Cards Layout (Grid / Minimalist) */}
                {layout === 'cards' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {content.story.map((event, index) => (
                            <motion.div 
                                key={event.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-background border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group"
                                style={{ borderRadius: theme.borderRadius.card }}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    {event.image && (
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold rounded shadow-sm">
                                        {event.year}
                                    </div>
                                </div>
                                <div className="p-6 space-y-3">
                                    <h3 className="font-heading text-2xl text-primary">{event.title}</h3>
                                    <p className="font-body text-muted text-sm line-clamp-3">{event.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
