import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { ThemeSelector } from './ThemeSelector';
import { Palette, PenTool, Globe, Type, Image, Music, MapPin, Gift, Heart, Layout, Home, Clock } from 'lucide-react';
import { AiLogoGenerator } from '../tools/AiLogoGenerator';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store/themeStore';
import { useContentStore } from '../../store/contentStore';
import { MediaLibrary } from '../ui/MediaLibrary';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/Accordion';

export const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const { overrides, setPrimaryColor, setFonts } = useThemeStore();
  const { 
    content, 
    updateContent, 
    updateHero,
    updateStoryEvent, 
    addStoryEvent, 
    removeStoryEvent,
    addHotel,
    removeHotel,
    updateHotel,
    addRegistryItem,
    removeRegistryItem,
    updateRegistryItem,
    updateAudio,
    toggleSection,
    addScheduleItem,
    removeScheduleItem,
    updateScheduleItem,
    updateSectionLayout
  } = useContentStore();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WedBuilder Pro
          </h2>
          {/* Language Switcher Mini */}
          <div className="flex gap-1 text-xs">
              <button onClick={() => changeLanguage('en')} className={`p-1 ${i18n.language === 'en' ? 'font-bold underline' : 'text-gray-400'}`}>EN</button>
              <button onClick={() => changeLanguage('ru')} className={`p-1 ${i18n.language === 'ru' ? 'font-bold underline' : 'text-gray-400'}`}>RU</button>
              <button onClick={() => changeLanguage('hy')} className={`p-1 ${i18n.language === 'hy' ? 'font-bold underline' : 'text-gray-400'}`}>HY</button>
          </div>
      </div>

      <Tabs defaultValue="content" className="w-full flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="content">
            <PenTool className="w-4 h-4 mr-2" />
            {t('nav.content', 'Content')}
          </TabsTrigger>
          <TabsTrigger value="design">
            <Palette className="w-4 h-4 mr-2" />
            {t('nav.design', 'Design')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="flex-1 overflow-y-auto pr-2">
          <Accordion type="single" collapsible defaultValue="basic" className="w-full space-y-2">
             
             {/* 1. Basic Info */}
             <AccordionItem value="basic" className="border rounded-md px-3 border-gray-200">
                <AccordionTrigger className="hover:no-underline py-3">
                   <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <Heart className="w-4 h-4 text-pink-500" />
                      Basic Details
                   </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Couple Names</label>
                        <input type="text" value={content.names} onChange={(e) => updateContent({ names: e.target.value })} className="w-full text-sm border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Date</label>
                        <input type="text" value={content.date} onChange={(e) => updateContent({ date: e.target.value })} className="w-full text-sm border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Location</label>
                        <input type="text" value={content.location} onChange={(e) => updateContent({ location: e.target.value })} className="w-full text-sm border-gray-300 rounded-md p-2" />
                    </div>
                </AccordionContent>
             </AccordionItem>

             {/* 2. Hero Configuration */}
             <AccordionItem value="hero" className="border rounded-md px-3 border-gray-200">
                <AccordionTrigger className="hover:no-underline py-3">
                   <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <Home className="w-4 h-4 text-blue-500" />
                      Hero Section
                   </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Headline</label>
                        <input type="text" value={content.hero.headline} onChange={(e) => updateHero({ headline: e.target.value })} className="w-full text-sm border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Subheadline</label>
                        <input type="text" value={content.hero.subheadline} onChange={(e) => updateHero({ subheadline: e.target.value })} className="w-full text-sm border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Layout</label>
                        <select 
                            value={content.hero.layoutMode} 
                            onChange={(e) => updateHero({ layoutMode: e.target.value as 'centered' | 'split' | 'cover' })}
                            className="w-full text-sm border-gray-300 rounded-md p-2 bg-white"
                        >
                            <option value="centered">Centered</option>
                            <option value="split">Split Screen</option>
                            <option value="cover">Full Cover</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                        <MediaLibrary 
                            onSelect={(url) => updateHero({ backgroundImage: url })} 
                            trigger={
                                <button className="flex-1 text-xs border border-gray-300 rounded p-2 hover:bg-gray-50 flex items-center justify-center gap-2">
                                    <Image className="w-3 h-3" /> Change Cover Image
                                </button>
                            }
                        />
                    </div>
                </AccordionContent>
             </AccordionItem>

             {/* 3. Audio / Music */}
             <AccordionItem value="audio" className="border rounded-md px-3 border-gray-200">
                <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <Music className="w-4 h-4 text-purple-500" />
                        Background Music
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-500">Track URL (MP3)</label>
                        <input type="text" value={content.audio.trackUrl} onChange={(e) => updateAudio({ trackUrl: e.target.value })} className="w-full text-sm border-gray-300 rounded-md p-2" />
                        <p className="text-[10px] text-gray-400">Use a direct link to an mp3 file.</p>
                    </div>
                    <div className="space-y-1">
                         <label className="text-xs font-medium text-gray-500">Volume ({Math.round(content.audio.volume * 100)}%)</label>
                         <input 
                            type="range" 
                            min="0" max="1" step="0.1" 
                            value={content.audio.volume} 
                            onChange={(e) => updateAudio({ volume: parseFloat(e.target.value) })}
                            className="w-full"
                        />
                    </div>
                </AccordionContent>
             </AccordionItem>

             {/* 3.5. Schedule */}
             <AccordionItem value="schedule" className="border rounded-md px-3 border-gray-200">
                 <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center justify-between w-full pr-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                            <Clock className="w-4 h-4 text-pink-500" />
                            {t('sections.schedule', 'Day Schedule')}
                        </div>
                        <div onClick={(e) => { e.stopPropagation(); toggleSection('schedule'); }} className={`w-8 h-4 rounded-full relative transition-colors ${content.sectionVisibility.schedule ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${content.sectionVisibility.schedule ? 'left-4.5' : 'left-0.5'}`} />
                        </div>
                    </div>
                 </AccordionTrigger>
                 <AccordionContent className="space-y-4">
                     <button onClick={addScheduleItem} className="w-full py-2 text-xs border border-dashed border-gray-300 rounded hover:border-blue-500 hover:text-blue-500 transition-colors">
                         + {t('actions.add_event', 'Add Event')}
                     </button>
                     {content.schedule.map((event) => (
                         <div key={event.id} className="bg-gray-50 p-3 rounded-md border text-xs space-y-2 relative group">
                             <button onClick={() => removeScheduleItem(event.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">&times;</button>
                             <div className="flex gap-2">
                                <input type="text" value={event.time} onChange={(e) => updateScheduleItem(event.id, { time: e.target.value })} className="w-20 border-gray-300 rounded p-1 font-bold mb-1 text-center" placeholder="Time" />
                                <AiLogoGenerator onSelect={(url) => updateScheduleItem(event.id, { customLogo: url })} />
                             </div>
                             <input type="text" value={event.title} onChange={(e) => updateScheduleItem(event.id, { title: e.target.value })} className="w-full border-gray-300 rounded p-1 font-bold" placeholder="Event Title" />
                             <input type="text" value={event.location} onChange={(e) => updateScheduleItem(event.id, { location: e.target.value })} className="w-full border-gray-300 rounded p-1" placeholder="Location" />
                             <select 
                                value={event.type} 
                                onChange={(e) => updateScheduleItem(event.id, { type: e.target.value as 'church' | 'reception' | 'party' | 'other' })}
                                className="w-full border-gray-300 rounded p-1 bg-white"
                             >
                                <option value="church">Church</option>
                                <option value="reception">Reception</option>
                                <option value="party">Party</option>
                                <option value="other">Other</option>
                             </select>
                             <textarea value={event.description} onChange={(e) => updateScheduleItem(event.id, { description: e.target.value })} className="w-full border-gray-300 rounded p-1" rows={2} placeholder="Description" />
                         </div>
                     ))}
                 </AccordionContent>
             </AccordionItem>

             {/* 4. Timeline / Story */}
             <AccordionItem value="story" className="border rounded-md px-3 border-gray-200">
                 <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center justify-between w-full pr-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                            <Layout className="w-4 h-4 text-green-500" />
                            Our Story
                        </div>
                        {/* Toggle Visibility */}
                        <div 
                            onClick={(e) => { e.stopPropagation(); toggleSection('story'); }}
                            className={`w-8 h-4 rounded-full relative transition-colors ${content.sectionVisibility.story ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${content.sectionVisibility.story ? 'left-4.5' : 'left-0.5'}`} />
                        </div>
                    </div>
                 </AccordionTrigger>
                 <AccordionContent className="space-y-4">
                     <button onClick={addStoryEvent} className="w-full py-2 text-xs border border-dashed border-gray-300 rounded hover:border-blue-500 hover:text-blue-500 transition-colors">
                         + Add Timeline Event
                     </button>
                     {content.story.map((event) => (
                         <div key={event.id} className="bg-gray-50 p-3 rounded-md border text-xs space-y-2 relative group">
                             <button onClick={() => removeStoryEvent(event.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">&times;</button>
                             <input type="text" value={event.year} onChange={(e) => updateStoryEvent(event.id, { year: e.target.value })} className="w-full border-gray-300 rounded p-1 font-bold mb-1" placeholder="Year" />
                             <div className="flex gap-2">
                                <input type="text" value={event.title} onChange={(e) => updateStoryEvent(event.id, { title: e.target.value })} className="w-full border-gray-300 rounded p-1" placeholder="Title" />
                                <MediaLibrary onSelect={(url) => updateStoryEvent(event.id, { image: url })} trigger={<button className="p-1 rounded border hover:bg-gray-100"><Image className="w-4 h-4 text-gray-500" /></button>} />
                             </div>
                             <textarea value={event.description} onChange={(e) => updateStoryEvent(event.id, { description: e.target.value })} className="w-full border-gray-300 rounded p-1" rows={2} placeholder="Description" />
                         </div>
                     ))}
                 </AccordionContent>
             </AccordionItem>

             {/* 5. Travel & Hotels */}
             <AccordionItem value="travel" className="border rounded-md px-3 border-gray-200">
                 <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center justify-between w-full pr-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            Travel & Hotels
                        </div>
                        <div onClick={(e) => { e.stopPropagation(); toggleSection('travel'); }} className={`w-8 h-4 rounded-full relative transition-colors ${content.sectionVisibility.travel ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${content.sectionVisibility.travel ? 'left-4.5' : 'left-0.5'}`} />
                        </div>
                    </div>
                 </AccordionTrigger>
                 <AccordionContent className="space-y-4">
                     <button onClick={addHotel} className="w-full py-2 text-xs border border-dashed border-gray-300 rounded hover:border-blue-500 hover:text-blue-500 transition-colors">
                         + Add Hotel
                     </button>
                     {content.travel.map((hotel) => (
                         <div key={hotel.id} className="bg-gray-50 p-3 rounded-md border text-xs space-y-2 relative">
                             <button onClick={() => removeHotel(hotel.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">&times;</button>
                             <input type="text" value={hotel.name} onChange={(e) => updateHotel(hotel.id, { name: e.target.value })} className="w-full border-gray-300 rounded p-1 font-bold" placeholder="Hotel Name" />
                             <input type="text" value={hotel.address} onChange={(e) => updateHotel(hotel.id, { address: e.target.value })} className="w-full border-gray-300 rounded p-1" placeholder="Address" />
                             <div className="flex gap-2">
                                <input type="text" value={hotel.bookingNote} onChange={(e) => updateHotel(hotel.id, { bookingNote: e.target.value })} className="w-full border-gray-300 rounded p-1" placeholder="Booking Note (e.g. Code)" />
                                <MediaLibrary onSelect={(url) => updateHotel(hotel.id, { imageUrl: url })} trigger={<button className="p-1 rounded border hover:bg-gray-100"><Image className="w-4 h-4 text-gray-500" /></button>} />
                             </div>
                         </div>
                     ))}
                 </AccordionContent>
             </AccordionItem>

             {/* 6. Registry */}
             <AccordionItem value="registry" className="border rounded-md px-3 border-gray-200">
                 <AccordionTrigger className="hover:no-underline py-3">
                    <div className="flex items-center justify-between w-full pr-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                            <Gift className="w-4 h-4 text-red-500" />
                            Registry
                        </div>
                         <div onClick={(e) => { e.stopPropagation(); toggleSection('registry'); }} className={`w-8 h-4 rounded-full relative transition-colors ${content.sectionVisibility.registry ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${content.sectionVisibility.registry ? 'left-4.5' : 'left-0.5'}`} />
                        </div>
                    </div>
                 </AccordionTrigger>
                 <AccordionContent className="space-y-4">
                     <button onClick={addRegistryItem} className="w-full py-2 text-xs border border-dashed border-gray-300 rounded hover:border-blue-500 hover:text-blue-500 transition-colors">
                         + Add Gift Item
                     </button>
                     {content.registry.map((item) => (
                         <div key={item.id} className="bg-gray-50 p-3 rounded-md border text-xs space-y-2 relative">
                             <button onClick={() => removeRegistryItem(item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">&times;</button>
                             <div className="flex gap-2">
                                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden shrink-0">
                                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <input type="text" value={item.name} onChange={(e) => updateRegistryItem(item.id, { name: e.target.value })} className="w-full border-gray-300 rounded p-1 font-bold" placeholder="Item Name" />
                                    <div className="flex gap-2">
                                        <input type="text" value={item.price} onChange={(e) => updateRegistryItem(item.id, { price: e.target.value })} className="w-1/2 border-gray-300 rounded p-1" placeholder="Price" />
                                        <MediaLibrary onSelect={(url) => updateRegistryItem(item.id, { imageUrl: url })} trigger={<button className="p-1 rounded border hover:bg-gray-100 w-full text-center">Change Img</button>} />
                                    </div>
                                </div>
                             </div>
                         </div>
                     ))}
                 </AccordionContent>
             </AccordionItem>

          </Accordion>
        </TabsContent>
        
        <TabsContent value="design" className="flex-1 overflow-y-auto space-y-8 pr-1">
            {/* Theme Presets */}
            <section>
                <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4 text-gray-500" />
                    <h3 className="text-sm font-semibold text-gray-900">Theme Preset</h3>
                </div>
                <ThemeSelector />
            </section>
            
            <hr className="border-gray-100" />
            
            {/* Customization Overrides */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <h3 className="text-sm font-semibold text-gray-900">Global Overrides</h3>
                </div>
                
                {/* Primary Color Override */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-600">Primary Color</label>
                    <div className="flex gap-2 flex-wrap">
                        {['#1B2A41', '#E07A5F', '#D4AF37', '#8B4513', '#2C3E50', '#0077BE', '#D8BFD8'].map(color => (
                            <button
                                key={color}
                                className={`w-6 h-6 rounded-full border border-gray-200 transition-transform hover:scale-110 ${overrides.primary === color ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}
                                style={{ backgroundColor: color }}
                                onClick={() => setPrimaryColor(color)}
                            />
                        ))}
                    </div>
                </div>

                {/* Font Override */}
                <div className="space-y-2">
                     <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
                        <Type className="w-3 h-3" />
                         Heading Font
                     </label>
                     <select 
                        className="w-full text-sm border-gray-300 rounded-md shadow-sm p-2 bg-white"
                        onChange={(e) => setFonts({ heading: e.target.value })}
                        defaultValue=""
                     >
                         <option value="" disabled>Select Font...</option>
                         <option value="'Playfair Display', serif">Playfair Display</option>
                         <option value="'Lato', sans-serif">Lato</option>
                         <option value="'Montserrat', sans-serif">Montserrat</option>
                         <option value="'Great Vibes', cursive">Great Vibes</option>
                         <option value="'Inter', sans-serif">Inter</option>
                     </select>
                </div>

                {/* Section Layouts */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <Layout className="w-4 h-4 text-gray-500" />
                        Section Layouts
                    </h3>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-600">Hero Style</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['centered', 'cover', 'split'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => updateSectionLayout('hero', mode)}
                                    className={`px-2 py-1 text-xs border rounded capitalize ${content.sectionLayouts?.hero === mode ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-600">Timeline Style</label>
                        <div className="grid grid-cols-3 gap-2">
                             {['vertical', 'zigzag', 'cards'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => updateSectionLayout('timeline', mode)}
                                    className={`px-2 py-1 text-xs border rounded capitalize ${content.sectionLayouts?.timeline === mode ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </TabsContent>
      </Tabs>
      
      <div className="mt-auto pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
          v1.1.0 • WedBuilder Pro
      </div>
    </div>
  );
};
