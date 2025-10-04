interface LogoProps {
  label: string;
}

function LogoBadge({ label }: LogoProps) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
      {label}
    </span>
  );
}

export const Gemini = () => <LogoBadge label="Gemini" />;
export const GooglePaLM = () => <LogoBadge label="Google PaLM" />;
export const MagicUI = () => <LogoBadge label="MagicUI" />;
export const MediaWiki = () => <LogoBadge label="MediaWiki" />;
export const Replit = () => <LogoBadge label="Replit" />;
export const VSCodium = () => <LogoBadge label="VSCodium" />;
