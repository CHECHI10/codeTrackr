import Button from './Button';
import { CloseIcon } from './Icons';

export const Modal = ({ isOpen, title, description, children, onClose, size = 'md' }) => {
  if (!isOpen) return null;

  const maxWidth = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl'
  }[size];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-lg border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
