import { THEMES } from '../../themes/presets';
import { useThemeStore } from '../../store/themeStore';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeSelector = () => {
    const { currentThemeId, setThemeId } = useThemeStore();
    const themesList = Object.values(THEMES);

    return (
        <div className="grid grid-cols-2 gap-4">
            {themesList.map((theme) => {
                const isActive = currentThemeId === theme.id;
                
                return (
                    <motion.div
                        key={theme.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setThemeId(theme.id)}
                        className={cn(
                            "cursor-pointer rounded-lg border-2 overflow-hidden relative group transition-all",
                            isActive ? "border-blue-500 shadow-md ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"
                        )}
                    >
                        {/* Preview Mockup */}
                        <div className="h-24 w-full bg-gray-50 relative flex items-center justify-center text-xs overflow-hidden" 
                             style={{ backgroundColor: theme.colors.background }}>
                            {/* Abstract representation of the theme */}
                            <div className="space-y-1 text-center opacity-80" style={{ color: theme.colors.text }}>
                                <div className="font-bold text-[10px]" style={{ fontFamily: theme.fonts.heading.split(',')[0] }}>
                                    {theme.name}
                                </div>
                                <div className="w-8 h-8 rounded-full mx-auto" 
                                     style={{ 
                                         backgroundColor: theme.colors.primary,
                                         borderRadius: theme.borderRadius.button 
                                     }} />
                            </div>
                        </div>

                        {/* Name Label */}
                        <div className="p-2 bg-white text-center text-xs font-medium text-gray-700">
                            {theme.name}
                        </div>

                        {/* Active Indicator */}
                        {isActive && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-0.5">
                                <Check className="w-3 h-3" />
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};
