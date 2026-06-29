import { faqs } from "@/constants/index";
import { motion } from "motion/react";
import { SVGProps, useId } from "react";

export function FaqSection() {
  return (
    <div className="py-20 border-b border-border flex flex-col gap-8">
      <motion.div
        className="text-center space-y-4 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <span className="uppercase text-lg tracking-widest text-gray-200 font-semibold">
          Faqs Section
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-200">
          Questions <span className="text-green-400">About </span> Resume
          Builder
        </h2>
      </motion.div>
      <div className="flex flex-col gap-5 md:flex-row lg:flex-row">
        {faqs.map((s) => (
          <div
            key={s.title}
            className="relative bg-gradient-to-b from-neutral-900 dark:from-neutral-100 to-neutral-950 dark:to-white p-6 rounded-3xl overflow-hidden flex-1"
          >
            <Grid size={30} />
            <span className="text-2xl font-bold dark:text-neutral-800 text-white relative z-20 text-center">
              {s.title}
            </span>
            <p className="dark:text-neutral-600 text-neutral-400 mt-4 text-base font-normal relative z-20">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

interface GridPatternProps extends SVGProps<SVGSVGElement> {
  width: number;
  height: number;
  x: number | string;
  y: number | string;
  squares?: number[][];
}

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: GridPatternProps) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: number[]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
