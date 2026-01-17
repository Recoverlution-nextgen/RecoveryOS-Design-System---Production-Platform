import { Play, Pause, Volume2, Maximize2, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface VideoPlayerProps {
  title: string;
  thumbnailUrl: string;
  description?: string;
  instructor?: string;
  category?: string;
}

export function VideoPlayer({ title, thumbnailUrl, description, instructor, category }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-white p-10">
      <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full space-y-5">
        <div className="bg-black rounded-[12px] overflow-hidden shadow-xl ring-1 ring-black/5">
          {/* Video Container */}
          <div className="relative aspect-video bg-black">
            <ImageWithFallback
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover opacity-90"
            />
            
            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="group relative w-20 h-20 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] ring-1 ring-white/20"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6B9FA6]/10 to-[#2C4F7C]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-[#2C4F7C] relative z-10" fill="currentColor" />
                ) : (
                  <Play className="w-8 h-8 text-[#2C4F7C] ml-1 relative z-10" fill="currentColor" />
                )}
              </button>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)' }}>{title}</h2>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gradient-to-b from-gray-900 to-black p-5">
            {/* Progress Bar */}
            <div className="mb-5">
              <div 
                className="h-1.5 bg-white/10 rounded-full cursor-pointer group overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = (x / rect.width) * 100;
                  setProgress(percentage);
                }}
              >
                <div 
                  className="h-full bg-gradient-to-r from-[#6B9FA6] to-[#5A8A91] rounded-full transition-all relative shadow-lg shadow-[#6B9FA6]/50"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                </div>
              </div>
              <div className="flex justify-between items-center mt-2.5 text-xs text-white/60">
                <span>2:34</span>
                <span>15:00</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button className="text-white/60 hover:text-white transition-all hover:scale-110">
                <SkipBack className="w-5 h-5" />
              </button>
              <button 
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-[#6B9FA6] to-[#5A8A91] flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-[#6B9FA6]/30 hover:shadow-xl hover:shadow-[#6B9FA6]/40"
              >
                {isPlaying ? (
                  <Pause className="w-4.5 h-4.5 text-white" fill="currentColor" />
                ) : (
                  <Play className="w-4.5 h-4.5 text-white ml-0.5" fill="currentColor" />
                )}
              </button>
              <button className="text-white/60 hover:text-white transition-all hover:scale-110">
                <SkipForward className="w-5 h-5" />
              </button>
              <div className="flex-1" />
              <button className="text-white/60 hover:text-white transition-all hover:scale-110">
                <Volume2 className="w-5 h-5" />
              </button>
              <button className="text-white/60 hover:text-white transition-all hover:scale-110">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Session Description */}
        {(description || instructor || category) && (
          <div className="bg-white rounded-[10px] p-6 border border-gray-200/40 shadow-md shadow-black/5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <h4 className="text-gray-900" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>About this session</h4>
                {category && (
                  <span className="inline-flex px-2.5 py-0.5 bg-gradient-to-r from-[#6B9FA6]/10 to-[#2C4F7C]/10 text-[#2C4F7C] rounded-full text-xs font-semibold border border-[#6B9FA6]/20" style={{ fontFamily: 'var(--font-sans)' }}>
                    {category}
                  </span>
                )}
              </div>
              {instructor && (
                <div className="text-sm text-gray-500 font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                  <span className="text-gray-400">Led by </span>
                  <span className="text-gray-700 font-semibold">{instructor}</span>
                </div>
              )}
            </div>
            {description && (
              <p className="text-gray-600 leading-relaxed text-sm font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
