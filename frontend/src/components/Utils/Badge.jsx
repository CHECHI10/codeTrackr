const variants = {
  neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  easy: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900',
  medium: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:ring-orange-900',
  hard: 'bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900',
  solved: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-900',
  attempted: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:ring-orange-900',
  unsolved: 'bg-neutral-100 text-neutral-600 ring-1 ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-700'
};

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${variants[variant] || variants.neutral} ${className}`}>
      {children}
    </span>
  );
}
