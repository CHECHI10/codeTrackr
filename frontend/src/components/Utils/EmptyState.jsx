import Button from './Button';

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
