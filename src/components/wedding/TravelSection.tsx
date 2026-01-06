import { useThemeStore } from '../../store/themeStore';
import { Plane, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const TravelSection = () => {
    // const { content } = useContentStore(); // Future: use content for travel items
    const { getEffectiveTheme } = useThemeStore();
    const theme = getEffectiveTheme();

    const hotels = [
        { name: "Grand Plaza Hotel", distance: "0.5 miles", price: "$$$", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" },
        { name: "Cozy Inn & Suites", distance: "2 miles", price: "$$", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400" },
    ];

    return (
        <section className="py-24 px-4 bg-background text-text border-t border-border">
            <div className="max-w-5xl mx-auto">
                 <div className="text-center mb-16">
                     <Plane className="w-12 h-12 mx-auto mb-4 text-secondary rotate-[-45deg]" />
                     <h2 className="font-heading text-4xl text-primary mb-4">Travel & Stay</h2>
                     <p className="font-body text-lg text-muted max-w-2xl mx-auto">
                        We've arranged special rates at these nearby hotels. Mention the "Sarah & James" wedding when booking.
                     </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     {hotels.map((hotel, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="flex flex-col md:flex-row bg-surface rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all h-auto md:h-48 group"
                            style={{ borderRadius: theme.borderRadius.card }}
                        >
                            <div className="w-full md:w-1/3 h-48 md:h-full overflow-hidden">
                                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="flex-1 p-6 flex flex-col justify-center space-y-2">
                                <h3 className="font-heading text-xl font-bold text-primary">{hotel.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted">
                                    <MapPin className="w-3 h-3" />
                                    <span>{hotel.distance} from venue</span>
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">{hotel.price}</span>
                                    <button className="text-sm font-bold text-secondary hover:underline">Book Now &rarr;</button>
                                </div>
                            </div>
                        </motion.div>
                     ))}
                </div>
            </div>
        </section>
    );
};
