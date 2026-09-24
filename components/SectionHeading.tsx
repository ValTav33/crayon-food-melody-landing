import Reveal from './Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <Reveal className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <span className="h-px w-8 rule-accent" />
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <h2 className="mt-3 text-[2rem] font-normal leading-[1.1] tracking-tight text-chalk sm:text-[2.6rem] snap:mt-[1.6vh] snap:text-[clamp(2.1rem,5.4vh,3rem)]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[0.98rem] leading-relaxed text-white/60 sm:text-[1.05rem] snap:mt-[1.6vh] snap:line-clamp-2">
          {description}
        </p>
      )}
    </Reveal>
  );
}
