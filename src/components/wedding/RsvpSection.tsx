import { useContentStore } from '../../store/contentStore';
import { useThemeStore } from '../../store/themeStore';
import { motion } from 'framer-motion';

export const RsvpSection = () => {
    const { content } = useContentStore();
    const { getEffectiveTheme } = useThemeStore();
    const theme = getEffectiveTheme();

    return (
        <section className="py-24 px-4 bg-surface/50 text-text">
            <div className="max-w-xl mx-auto text-center bg-white p-8 md:p-12 shadow-xl border border-border" 
                 style={{ borderRadius: theme.borderRadius.card }}>
                
                <h2 className="font-heading text-4xl text-primary mb-2">RSVP</h2>
                <p className="font-body text-muted mb-8">Please respond by {content.rsvpDeadline}</p>
                
                <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 font-body">Full Name</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    
                    <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-700 font-body">Will you be attending?</label>
                         <div className="flex gap-4">
                             <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="radio" name="attending" value="yes" className="accent-primary" />
                                 <span>Joyfully Accept</span>
                             </label>
                             <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="radio" name="attending" value="no" className="accent-primary" />
                                 <span>Regretfully Decline</span>
                             </label>
                         </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 font-body">Guests</label>
                         <select className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white">
                             <option>1</option>
                             <option>2</option>
                             <option>3</option>
                         </select>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 text-white font-bold text-lg shadow-lg mt-4"
                        style={{ 
                            backgroundColor: theme.colors.primary,
                            borderRadius: theme.borderRadius.button
                        }}
                    >
                        Send RSVP
                    </motion.button>
                </form>
            </div>
        </section>
    );
};
