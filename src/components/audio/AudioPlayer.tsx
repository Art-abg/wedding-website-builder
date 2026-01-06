import { useRef, useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useContentStore } from '../../store/contentStore';
import { useThemeStore } from '../../store/themeStore';

export const AudioPlayer = () => {
    const { content } = useContentStore();
    const { getEffectiveTheme } = useThemeStore();
    const theme = getEffectiveTheme();
    
    // We keep local state for playing/volume to avoid re-rendering the whole store on every tick if we were tracking progress
    // But the source of truth for "should be playing?" is the store if we want auto-play, 
    // for now let's just use local state for the UI, initialized from store.
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (content.audio.trackUrl && audioRef.current) {
            audioRef.current.volume = content.audio.volume;
        }
    }, [content.audio.trackUrl, content.audio.volume]);

    if (!content.audio.trackUrl) return null;

    return (
        <div 
            className="fixed bottom-4 right-4 z-50 flex items-center gap-3 p-3 rounded-full shadow-lg backdrop-blur-md border transition-all hover:scale-105"
            style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: theme.colors.primary,
                color: theme.colors.primary,
            }}
        >
            <audio 
                ref={audioRef} 
                src={content.audio.trackUrl} 
                loop 
            />
            
            <button 
                onClick={togglePlay}
                className="hover:scale-110 transition-transform"
            >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            
            <div className="hidden md:block text-xs font-medium tracking-wide pr-2">
                {isPlaying ? 'Playing Music' : 'Play Music'}
            </div>
        </div>
    );
};
