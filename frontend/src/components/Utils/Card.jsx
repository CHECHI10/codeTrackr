export default function Card({ children, className = '' }) {
  return (
    <section className={`rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 ${className}`}>
      {children}
    </section>
  );
}
