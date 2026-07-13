import useApp from '../../customHook/useApp';
import { CloseIcon } from './Icons';

const tone = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100',
  error: 'border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100',
  info: 'border-neutral-200 bg-white text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100'
};

export default function ToastViewport() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed right-4 top-4 z-[70] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start justify-between gap-3 rounded-lg border p-3 text-sm shadow-lg ${tone[toast.type] || tone.info}`}
        >
          <p>{toast.message}</p>
          <button
            type="button"
            className="rounded-md p-1 opacity-70 transition hover:opacity-100"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
