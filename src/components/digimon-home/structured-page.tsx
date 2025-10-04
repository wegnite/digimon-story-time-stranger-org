import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export type StructuredSection = {
  title: string;
  description?: string;
  items?: string[];
  highlights?: Array<{ title: string; description: string }>;
  cta?: {
    label: string;
    href: string;
  };
};

export type StructuredPageData = {
  hero: {
    badge?: string;
    title: string;
    description: string;
  };
  sections: StructuredSection[];
  resources?: Array<{
    title: string;
    description?: string;
    href: string;
  }>;
  actions?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

interface StructuredPageProps {
  data: StructuredPageData;
}

export function StructuredPage({ data }: StructuredPageProps) {
  const { hero, sections, resources, actions } = data;

  return (
    <div className="bg-[#010314] text-white">
      <section className="border-b border-white/10 bg-[#03061a] py-16">
        <div className="container mx-auto space-y-6 px-4">
          {hero.badge ? (
            <Badge
              variant="outline"
              className="w-fit border-blue-500/60 bg-blue-500/10 text-xs uppercase tracking-wide"
            >
              {hero.badge}
            </Badge>
          ) : null}
          <h1 className="text-4xl font-semibold md:text-5xl">{hero.title}</h1>
          <p className="max-w-3xl text-base text-slate-200 md:text-lg">
            {hero.description}
          </p>
          {actions ? (
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              {actions.primary ? (
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Link href={actions.primary.href}>
                    {actions.primary.label}
                  </Link>
                </Button>
              ) : null}
              {actions.secondary ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  <Link href={actions.secondary.href}>
                    {actions.secondary.label}
                  </Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className="container mx-auto space-y-8 px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section, index) => (
            <section
              key={`${section.title}-${index}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200 backdrop-blur"
            >
              <header className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">
                  {section.title}
                </h2>
                {section.description ? (
                  <h3 className="text-sm font-normal leading-relaxed text-slate-300">
                    {section.description}
                  </h3>
                ) : null}
              </header>
              {section.items ? (
                <div className="mt-4 space-y-2 text-sm">
                  {section.items.map((item, idx) => (
                    <div
                      key={`${section.title}-item-${idx}`}
                      className="rounded-lg border border-white/10 bg-white/5 p-3"
                    >
                      <p className="text-sm text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
              ) : null}
              {section.highlights ? (
                <div className="mt-4 space-y-3">
                  {section.highlights.map((highlight, idx) => (
                    <article
                      key={`${highlight.title}-${idx}`}
                      className="rounded-lg border border-white/10 bg-white/5 p-3"
                    >
                      <h3 className="text-sm font-semibold text-white">
                        {highlight.title}
                      </h3>
                      <p className="text-xs text-slate-300">
                        {highlight.description}
                      </p>
                    </article>
                  ))}
                </div>
              ) : null}
              {section.cta ? (
                <div className="mt-4">
                  <Button
                    asChild
                    variant="ghost"
                    className="px-0 text-sm font-semibold text-blue-300 hover:text-blue-200"
                  >
                    <Link href={section.cta.href}>{section.cta.label}</Link>
                  </Button>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </section>

      {resources && resources.length > 0 ? (
        <section className="border-t border-white/10 bg-[#03061a] py-16">
          <div className="container mx-auto space-y-6 px-4">
            <h2 className="text-2xl font-semibold text-white">
              Companion resources
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {resources.map((resource, index) => (
                <div
                  key={`${resource.title}-${index}`}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 text-slate-200"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      {resource.title}
                    </h3>
                    <Link
                      href={resource.href}
                      className="text-sm font-medium text-blue-300 hover:text-blue-200"
                    >
                      Open
                    </Link>
                  </div>
                  {resource.description ? (
                    <p className="mt-2 text-sm text-slate-300">
                      {resource.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
