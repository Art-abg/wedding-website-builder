import { Sidebar } from '../editor/Sidebar';
import { PreviewCanvas } from '../preview/PreviewCanvas';
import { AudioPlayer } from '../audio/AudioPlayer';

export const EditorLayout = () => {
  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar - Fixed width */}
      <div className="w-80 md:w-96 flex-shrink-0 border-r border-gray-200 bg-white/80 backdrop-blur-sm h-full overflow-y-auto z-10 shadow-lg">
        <Sidebar />
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 h-full overflow-hidden relative flex flex-col">
        {/* Top Bar */}
        <header className="h-12 border-b border-gray-200 bg-white flex items-center justify-between px-4">
             <div className="text-sm font-medium text-gray-500">Live Preview</div>
             <div className="flex gap-2">
                 <button className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg hover:opacity-90 transition-opacity shadow">
                     Publish
                 </button>
             </div>
        </header>
        
        {/* Canvas Wrapper */}
        <main className="flex-1 bg-gray-100 overflow-hidden relative">
            <PreviewCanvas />
            <AudioPlayer />
        </main>
      </div>
    </div>
  );
};

