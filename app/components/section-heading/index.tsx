export default function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{index}</span> / {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">{title}</h2>
    </div>
  );
}
