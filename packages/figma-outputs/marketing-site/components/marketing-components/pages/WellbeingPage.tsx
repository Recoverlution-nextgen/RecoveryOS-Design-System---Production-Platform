import { useState } from 'react';
import { SAMPLE_VIDEOS } from '@/lib/wellbeing/SAMPLE_VIDEOS';
import type { WellbeingVideo, VideoCategory, VideoIntensity } from '@/lib/types/wellbeing';
import { Play, Clock, Filter, Search, Heart } from 'lucide-react';

export function WellbeingPage() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | 'all'>('all');
  const [selectedIntensity, setSelectedIntensity] = useState<VideoIntensity | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<WellbeingVideo | null>(null);

  // Filter videos
  const filteredVideos = SAMPLE_VIDEOS.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesIntensity = selectedIntensity === 'all' || video.intensity === selectedIntensity;
    const matchesSearch = searchQuery === '' || 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesIntensity && matchesSearch;
  });

  const categories: { id: VideoCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'yoga', label: 'Yoga' },
    { id: 'meditation', label: 'Meditation' },
    { id: 'breathwork', label: 'Breathwork' },
    { id: 'body_scan', label: 'Body Scan' },
    { id: 'movement', label: 'Movement' },
  ];

  const intensities: { id: VideoIntensity | 'all'; label: string }[] = [
    { id: 'all', label: 'All Intensities' },
    { id: 'gentle', label: 'Gentle' },
    { id: 'moderate', label: 'Moderate' },
    { id: 'vigorous', label: 'Vigorous' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#3E2BB8]/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-[#3E2BB8] mb-2">Wellbeing</h1>
          <p className="text-[#3E2BB8]/60">
            300 premium videos for movement, breath, and embodiment
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#3E2BB8]/20 bg-[#3E2BB8]/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#3E2BB8]/40" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] placeholder:text-[#3E2BB8]/40 focus:outline-none focus:border-[#5739FB]"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="size-5 text-[#3E2BB8]/60" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as VideoCategory | 'all')}
                className="px-4 py-2 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] focus:outline-none focus:border-[#5739FB]"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Intensity Filter */}
            <div>
              <select
                value={selectedIntensity}
                onChange={(e) => setSelectedIntensity(e.target.value as VideoIntensity | 'all')}
                className="px-4 py-2 border border-[#3E2BB8]/20 bg-white text-[#3E2BB8] focus:outline-none focus:border-[#5739FB]"
              >
                {intensities.map(i => (
                  <option key={i.id} value={i.id}>{i.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer border border-[#3E2BB8]/20 bg-white overflow-hidden hover:border-[#3E2BB8] transition-all"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-[#3E2BB8]/5 overflow-hidden">
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#3E2BB8]/20 group-hover:bg-[#3E2BB8]/10 transition-colors flex items-center justify-center">
                  <div className="size-16 border-2 border-white bg-[#5739FB] flex items-center justify-center group-hover:bg-[#3E2BB8] transition-colors">
                    <Play className="size-8 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-[#3E2BB8]/80 text-white text-sm flex items-center gap-1">
                  <Clock className="size-3" />
                  <span>{video.duration_minutes} min</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs border border-[#3E2BB8]/20 bg-[#3E2BB8]/5 text-[#3E2BB8] capitalize">
                    {video.category}
                  </span>
                  <span className="px-2 py-1 text-xs text-[#5739FB]/60 capitalize">
                    {video.intensity}
                  </span>
                </div>
                <h3 className="text-[#3E2BB8] mb-1 group-hover:text-[#5739FB] transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-[#3E2BB8]/60">
                  {video.instructor}
                </p>

                {/* Schema Tags */}
                {video.schema_targets.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {video.schema_targets.slice(0, 2).map(schema => (
                      <span
                        key={schema}
                        className="px-2 py-1 text-xs bg-[#3E2BB8]/5 text-[#3E2BB8]/60"
                      >
                        {schema.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#3E2BB8]/60">
              No videos found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      {/* Video Player Modal (Simple version) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="border-b border-[#3E2BB8]/20 p-6">
            <div className="max-w-5xl mx-auto flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 text-xs border border-[#3E2BB8] bg-[#3E2BB8]/10 text-[#3E2BB8] capitalize">
                    {selectedVideo.category}
                  </span>
                  <span className="text-sm text-[#3E2BB8]/60 capitalize">
                    {selectedVideo.intensity} · {selectedVideo.duration_minutes} min
                  </span>
                </div>
                <h1 className="text-[#3E2BB8]">{selectedVideo.title}</h1>
                <p className="text-[#3E2BB8]/60 mt-1">with {selectedVideo.instructor}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-6 py-2 border border-[#3E2BB8]/20 text-[#3E2BB8] hover:bg-[#3E2BB8]/5 transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#3E2BB8]/5">
            <div className="max-w-5xl mx-auto p-6">
              {/* Video Player Placeholder */}
              <div className="aspect-video bg-[#3E2BB8]/10 border border-[#3E2BB8]/20 flex items-center justify-center mb-6">
                <div className="text-center">
                  <Play className="size-16 text-[#3E2BB8]/40 mx-auto mb-4" />
                  <p className="text-[#3E2BB8]/60">
                    Video player would be here
                  </p>
                  <p className="text-sm text-[#3E2BB8]/40 mt-2">
                    {selectedVideo.video_url}
                  </p>
                </div>
              </div>

              {/* Video Details */}
              <div className="bg-white border border-[#3E2BB8]/20 p-6">
                <h3 className="text-[#3E2BB8] mb-4">About this practice</h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-[#3E2BB8]/60">Focus Areas:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedVideo.schema_targets.map(schema => (
                        <span
                          key={schema}
                          className="px-3 py-1 bg-[#3E2BB8]/5 text-[#3E2BB8] border border-[#3E2BB8]/10"
                        >
                          {schema.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#3E2BB8]/60">Body Systems:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedVideo.body_systems.map(system => (
                        <span
                          key={system}
                          className="px-3 py-1 bg-[#5739FB]/5 text-[#5739FB] border border-[#5739FB]/10"
                        >
                          {system.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
