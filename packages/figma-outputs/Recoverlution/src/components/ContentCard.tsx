import { Play, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ContentCardProps {
  title: string;
  duration: string;
  category: string;
  imageUrl: string;
  onPlay?: () => void;
}

export function ContentCard({ title, duration, category, imageUrl, onPlay }: ContentCardProps) {
  return (
    <div 
      className="bg-white rounded-[10px] overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:shadow-gray-200/80 hover:-translate-y-1 hover:scale-[1.01] group border border-gray-200/40 shadow-md shadow-black/5"
      onClick={onPlay}
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-[6px] text-[10px] text-[#2C4F7C] font-semibold tracking-wider shadow-lg" style={{ fontFamily: 'var(--font-sans)' }}>
            {category}
          </span>
        </div>
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-white/90 backdrop-blur-md flex items-center justify-center shadow-2xl ring-2 ring-white/50 transform group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 text-[#2C4F7C] ml-0.5" fill="currentColor" />
          </div>
        </div>
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#6B9FA6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-4">
        <h4 className="text-gray-900 mb-2 line-clamp-2 group-hover:text-[#2C4F7C] transition-colors" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{title}</h4>
        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
          <Clock className="w-3.5 h-3.5" />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}
