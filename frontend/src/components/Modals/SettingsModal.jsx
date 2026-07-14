import useApp from '../../customHook/useApp';
import Button from '../Utils/Button';
import { LogOutIcon, MoonIcon, PanelIcon, SunIcon } from '../Utils/Icons';
import { Modal } from '../Utils/Modal';

function SettingsModal() {
  const {
    activeModal,
    setActiveModal,
    MODALS,
    user,
    isDark,
    toggleTheme
  } = useApp();

  const initial = user?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';

  return (
    <Modal
      isOpen={activeModal === MODALS.SETTINGS}
      title="Settings"
      description="Account and workspace controls."
      onClose={() => setActiveModal(MODALS.NONE)}
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white dark:bg-white dark:text-neutral-950">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-950 dark:text-neutral-50">
              {user?.username || 'User'}
            </p>
            <p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
              {user?.email || 'No email available'}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" onClick={toggleTheme}>
            {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setActiveModal(MODALS.HELP)}
          >
            <PanelIcon className="h-4 w-4" />
            Keyboard shortcuts
          </Button>

          <Button
            variant="danger"
            className="w-full justify-start"
            onClick={() => setActiveModal(MODALS.LOGOUT_CONFIRM)}
          >
            <LogOutIcon className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SettingsModal;
