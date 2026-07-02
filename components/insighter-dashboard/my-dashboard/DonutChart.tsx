'use client';

export interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

/**
 * Lightweight SVG donut chart (replaces ApexCharts/Chart.js donuts from the
 * Angular app without adding a chart dependency).
 */
export default function DonutChart({
  slices,
  size = 200,
  thickness = 32,
  centerLabel,
  centerValue,
}: {
  slices: DonutSlice[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string | number;
}) {
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const segments = slices.map((slice) => {
    const fraction = total > 0 ? slice.value / total : 0;
    const segment = {
      ...slice,
      dash: fraction * circumference,
      gap: circumference - fraction * circumference,
      offset,
    };
    offset -= fraction * circumference;
    return segment;
  });

  return (
    <div className="relative inline-flex items-center justify-center" dir="ltr">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={`${seg.dash} ${seg.gap}`}
              strokeDashoffset={seg.offset}
            >
              <title>{`${seg.label}: ${seg.value}`}</title>
            </circle>
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {centerValue !== undefined && (
          <span className="text-2xl font-bold text-gray-800">{centerValue}</span>
        )}
        {centerLabel && <span className="text-xs font-medium text-gray-500">{centerLabel}</span>}
      </div>
    </div>
  );
}

export function DonutLegend({ slices }: { slices: DonutSlice[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
      {slices.map((slice, i) => (
        <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
          {slice.label}
        </div>
      ))}
    </div>
  );
}
