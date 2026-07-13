import useApp from '../../customHook/useApp';
import { Modal } from '../Utils/Modal';

function ShortcutModal() {
  const { activeModal, setActiveModal, MODALS } = useApp();
  const shortcuts = [
    ['Add Problem', 'Alt + N'],
    ['Random Practice', 'Alt + P'],
    ['Delete All', 'Alt + D'],
    ['Toggle Theme', 'Alt + T'],
    ['Toggle Sidebar', 'Alt + S'],
    ['Close Modal', 'Esc'],
    ['Show Shortcuts', 'Ctrl + /']
  ];

  return (
    <Modal
      isOpen={activeModal === MODALS.HELP}
      title="Keyboard Shortcuts"
      onClose={() => setActiveModal(MODALS.NONE)}
    >
      <div className="space-y-2">
        {shortcuts.map(([label, command]) => (
          <div key={label} className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2 dark:border-neutral-800">
            <span className="text-sm text-neutral-700 dark:text-neutral-300">{label}</span>
            <kbd className="rounded bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              {command}
            </kbd>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ShortcutModal;
