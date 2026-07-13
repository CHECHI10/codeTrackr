import Card from './Card';

function ProgressCard({ label, value, percent, helper }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
            {value}
          </p>
        </div>
        <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
          {percent}%
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
        <div
          className="h-full rounded-full bg-neutral-950 transition-all duration-300 dark:bg-white"
          style={{ width: `${Math.max(percent || 0, 2)}%` }}
        />
      </div>

      {helper && <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">{helper}</p>}
    </Card>
  );
}

export default ProgressCard;
