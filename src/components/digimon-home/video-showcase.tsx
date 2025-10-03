'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { useState } from 'react';

interface VideoShowcaseProps {
  title?: string;
  description?: string;
}

export function VideoShowcaseSection({
  title = 'Official Game Trailers',
  description = 'Watch the latest gameplay videos and official trailers',
}: VideoShowcaseProps) {
  const [activeVideo, setActiveVideo] = useState(0);

  const videos = [
    {
      id: 'HRkN-3QM9Gk',
      title: 'Official Announcement Trailer',
      description: 'First look at Digimon Story Time Stranger',
      thumbnail: 'https://img.youtube.com/vi/HRkN-3QM9Gk/maxresdefault.jpg',
    },
    {
      id: 'gameplay-systems',
      title: 'Gameplay Systems Overview',
      description: 'Deep dive into game mechanics and features',
      thumbnail: '/imgs/digimon-gameplay.jpg',
    },
    {
      id: 'digimon-moves',
      title: 'Digimon Special Moves',
      description: 'Showcase of signature attacks and abilities',
      thumbnail: '/imgs/digimon-moves.jpg',
    },
  ];

  return (
    <section className="border-b border-blue-500/20 bg-gradient-to-b from-[#030508] to-[#040610] py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.08),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-slate-300">{description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-purple-500/5 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.15)]">
              <CardContent className="p-0">
                <div className="relative aspect-video w-full">
                  {videos[activeVideo]?.id ? (
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${videos[activeVideo].id}?autoplay=0&rel=0`}
                      title={videos[activeVideo].title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-800">
                      <Play className="h-20 w-20 text-blue-400" />
                    </div>
                  )}
                </div>
                <div className="space-y-2 p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {videos[activeVideo].title}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {videos[activeVideo].description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Playlist */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">More Videos</h3>
            {videos.map((video, index) => (
              <button
                type="button"
                key={video.id}
                onClick={() => setActiveVideo(index)}
                className={`group w-full overflow-hidden rounded-lg border transition-all duration-300 ${
                  activeVideo === index
                    ? 'border-blue-400/60 bg-gradient-to-br from-blue-500/20 to-purple-500/15 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                    : 'border-blue-500/20 bg-blue-500/5 hover:border-blue-400/40 hover:bg-blue-500/10'
                }`}
              >
                <div className="flex gap-3 p-3">
                  <div className="relative h-16 w-24 flex-none overflow-hidden rounded bg-slate-800">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all group-hover:bg-black/20">
                      <Play className="h-6 w-6 text-white transition-transform group-hover:scale-125" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1 text-left">
                    <p className="text-sm font-medium text-white line-clamp-1">
                      {video.title}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
