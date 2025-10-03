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
    <section className="border-b border-white/10 bg-[#030508] py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-slate-300">{description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-blue-500/30 bg-white/5 backdrop-blur">
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
            <h3 className="text-lg font-semibold text-white">More Videos</h3>
            {videos.map((video, index) => (
              <button
                type="button"
                key={video.id}
                onClick={() => setActiveVideo(index)}
                className={`group w-full overflow-hidden rounded-lg border transition-all ${
                  activeVideo === index
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 bg-white/5 hover:border-blue-500/50'
                }`}
              >
                <div className="flex gap-3 p-3">
                  <div className="relative h-16 w-24 flex-none overflow-hidden rounded bg-slate-800">
                    <div className="flex h-full items-center justify-center">
                      <Play className="h-6 w-6 text-blue-400 transition-transform group-hover:scale-110" />
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
