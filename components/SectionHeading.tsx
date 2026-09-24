export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-px w-8 rule-gold" />
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <h2 className="mt-4 text-[2rem] font-normal leading-[1.12] tracking-tight text-chalk sm:text-[2.6rem] lg:text-[3rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[0.98rem] leading-relaxed text-white/60 sm:text-[1.05rem]">{description}</p>
      )}
    </div>
  );
}
