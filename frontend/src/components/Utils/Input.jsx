export default function Input({ label, error, className = '', id, ...props }) {
  const inputId = id || props.name;

  return (
    <label className="block space-y-2" htmlFor={inputId}>
      {label && (
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </span>
      )}
      <input
        id={inputId}
        className={`h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:border-neutral-600 dark:focus:ring-neutral-800 ${className}`}
        {...props}
      />
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </label>
  );
}
