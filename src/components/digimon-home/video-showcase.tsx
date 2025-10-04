'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface VideoShowcaseProps {
  title?: string;
  description?: string;
}

export function VideoShowcaseSection({
  title,
  description,
}: VideoShowcaseProps) {
  const t = useTranslations('DigimonHome.videos');
  const heading = title ?? t('title');
  const lead = description ?? t('description');
  const playlistLabel = t('playlistLabel');
  const ctaLabel = t('ctaLabel');
  const ctaHref = t('ctaHref');
  const [activeVideo, setActiveVideo] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 4;

  const videos = [
    {
      id: 'alb_t8TikNI',
      platform: 'youtube' as const,
      title: 'Digimon Story: Cyber Sleuth - Official Trailer',
      description:
        'Experience the thrilling detective story in the Digital World',
      thumbnail: 'https://img.youtube.com/vi/alb_t8TikNI/maxresdefault.jpg',
    },
    {
      id: 'QZyoZTcUtSo',
      platform: 'youtube' as const,
      title: 'Digimon Story: Cyber Sleuth Complete Edition Trailer',
      description:
        'Join the Digital World and discover the truth in this epic RPG adventure',
      thumbnail: 'https://img.youtube.com/vi/QZyoZTcUtSo/maxresdefault.jpg',
    },
    {
      id: 'CmUr-47IQlc',
      platform: 'youtube' as const,
      title: 'Digimon Story: Cyber Sleuth Gameplay',
      description:
        'Complete guide to battles, evolution system, and story progression',
      thumbnail: 'https://img.youtube.com/vi/CmUr-47IQlc/maxresdefault.jpg',
    },
    {
      id: 'qBVq2Zq-Pac',
      platform: 'youtube' as const,
      title: "Digimon Story: Cyber Sleuth Hacker's Memory",
      description: 'Discover the untold side story of Cyber Sleuth',
      thumbnail: 'https://img.youtube.com/vi/qBVq2Zq-Pac/maxresdefault.jpg',
    },
    {
      id: 'W6GVzFWd-78',
      platform: 'youtube' as const,
      title: 'Digimon Story: Time Stranger - Beginner Guide',
      description:
        'Essential tips and tricks for starting your Digimon adventure',
      thumbnail: 'https://img.youtube.com/vi/W6GVzFWd-78/maxresdefault.jpg',
    },
    {
      id: 'R4qH_JHmxC8',
      platform: 'youtube' as const,
      title: 'Digimon Evolution System Explained',
      description: 'Master digivolution mechanics and build the perfect team',
      thumbnail: 'https://img.youtube.com/vi/R4qH_JHmxC8/maxresdefault.jpg',
    },
    {
      id: 'LcV7vSfaE1o',
      platform: 'youtube' as const,
      title: 'Digimon Story: Complete Walkthrough Part 1',
      description:
        'Full gameplay walkthrough from the beginning of your journey',
      thumbnail: 'https://img.youtube.com/vi/LcV7vSfaE1o/maxresdefault.jpg',
    },
    {
      id: 'gvWqI8ayYYs',
      platform: 'youtube' as const,
      title: 'Best Digimon Team Compositions Guide',
      description: 'Learn how to build powerful teams for different situations',
      thumbnail: 'https://img.youtube.com/vi/gvWqI8ayYYs/maxresdefault.jpg',
    },
    {
      id: 'U8Virpv7nxY',
      platform: 'youtube' as const,
      title: 'All Royal Knights Locations',
      description: 'How to find and obtain all Royal Knights Digimon',
      thumbnail: 'https://img.youtube.com/vi/U8Virpv7nxY/maxresdefault.jpg',
    },
    {
      id: 'XH5tn_7aDE8',
      platform: 'youtube' as const,
      title: 'Digimon Story: Advanced Battle Strategies',
      description: 'Master combat mechanics and defeat tough bosses',
      thumbnail: 'https://img.youtube.com/vi/XH5tn_7aDE8/maxresdefault.jpg',
    },
  ];

  const getEmbedUrl = (video: (typeof videos)[0]) => {
    if (video.platform === 'youtube') {
      return `https://www.youtube.com/embed/${video.id}?autoplay=0&rel=0`;
    }
    return '';
  };

  const totalPages = Math.ceil(videos.length / videosPerPage);
  const startIndex = currentPage * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentVideos = videos.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate JSON-LD for video structured data
  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: heading,
    description: lead,
    numberOfItems: videos.length,
    itemListElement: videos.map((video, index) => ({
      '@type': 'VideoObject',
      position: index + 1,
      name: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnail,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
      uploadDate: '2025-01-01',
      contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    })),
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />

      <section className="border-b border-blue-500/20 bg-gradient-to-b from-[#030508] to-[#040610] py-20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.08),transparent_60%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent md:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 text-lg text-slate-300">{lead}</p>
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
                        src={getEmbedUrl(videos[activeVideo])}
                        title={videos[activeVideo].title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        loading="lazy"
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

            {/* Video Playlist with Pagination */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  {playlistLabel}
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="h-8 w-8 border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4 text-blue-200" />
                  </Button>
                  <span className="text-xs text-slate-400">
                    {currentPage + 1} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    className="h-8 w-8 border-blue-400/30 bg-blue-500/10 hover:bg-blue-500/20 disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4 text-blue-200" />
                  </Button>
                </div>
              </div>
              {currentVideos.map((video, index) => {
                const actualIndex = startIndex + index;
                return (
                  <button
                    type="button"
                    key={video.id}
                    onClick={() => setActiveVideo(actualIndex)}
                    className={`group w-full overflow-hidden rounded-lg border transition-all duration-300 ${
                      activeVideo === actualIndex
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
                );
              })}
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            >
              <LocaleLink href={ctaHref}>{ctaLabel}</LocaleLink>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
