const MENTIONS = [
  "TRUPPER",
  "URREA",
  "WEG",
  "SIEMENS",
  "CONDULAC",
  "VOLTECK",
  "ARROW",
  "USA",
];

export function TrustMarquee() {
  const doubled = [...MENTIONS, ...MENTIONS];
  return (
    <div className="border-y border-border/80 bg-surface/40 py-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden px-6 lg:px-10">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent"
          aria-hidden
        />
        <div className="animate-marquee flex w-max items-center gap-16">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-lg font-medium tracking-tight text-muted/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
