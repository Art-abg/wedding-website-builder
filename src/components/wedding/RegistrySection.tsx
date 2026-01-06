import { useThemeStore } from '../../store/themeStore';
import { motion } from 'framer-motion';
import { Gift, ExternalLink } from 'lucide-react';

export const RegistrySection = () => {
    const { getEffectiveTheme } = useThemeStore();
    const theme = getEffectiveTheme();

    // Mock registry items for now, could be dynamic later
    const registryItems = [
        { name: "Crate & Barrel", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400", url: "#" },
        { name: "Williams Sonoma", image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=400", url: "#" },
        { name: "Honeymoon Fund", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=400", url: "#" },
    ];

    return (
        <section className="py-24 px-4 bg-background text-text">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                     <Gift className="w-12 h-12 mx-auto mb-4 text-primary" />
                     <h2 className="font-heading text-4xl text-primary mb-4">Registry</h2>
                     <p className="font-body text-lg text-muted max-w-2xl mx-auto">
                        Your presence is enough, but if you'd like to give a gift, we are registered at these stores.
                     </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {registryItems.map((item, idx) => (
                        <motion.a 
                            key={idx}
                            href={item.url}
                            whileHover={{ y: -5 }}
                            className="block group overflow-hidden bg-surface shadow-md border border-border"
                            style={{ borderRadius: theme.borderRadius.card }}
                        >
                            <div className="h-48 overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <div className="p-6 text-center flex items-center justify-between">
                                <span className="font-heading text-xl">{item.name}</span>
                                <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};
