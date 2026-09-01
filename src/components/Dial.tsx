interface DialProps {
  label: string;
  value: number;
  step?: number;
  onChange: (value: number) => void;
}

export function Dial({ label, value, step = 15, onChange }: DialProps) {
  const normalized = ((value % 360) + 360) % 360;

  return (
    <div className="flex items-center gap-4 rounded-3xl border border-brass/30 bg-parchment/70 p-4">
      <button
        type="button"
        className="min-h-11 min-w-11 rounded-full border border-brass/40 bg-paper px-4 text-2xl"
        aria-label={`Turn ${label} counterclockwise`}
        onClick={() => onChange(normalized - step)}
      >
        −
      </button>
      <div className="flex-1 text-center">
        <p className="font-display text-2xl">{label}</p>
        <p className="text-lg">{normalized}°</p>
      </div>
      <button
        type="button"
        className="min-h-11 min-w-11 rounded-full border border-brass/40 bg-paper px-4 text-2xl"
        aria-label={`Turn ${label} clockwise`}
        onClick={() => onChange(normalized + step)}
      >
        +
      </button>
    </div>
  );
}
