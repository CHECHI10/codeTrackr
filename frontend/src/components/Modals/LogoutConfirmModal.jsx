import useApp from '../../customHook/useApp';
import Button from '../Utils/Button';
import { Modal } from '../Utils/Modal';

function LogoutConfirmModal() {
  const {
    activeModal,
    setActiveModal,
    MODALS,
    handleLogout,
    actionLoading
  } = useApp();

  return (
    <Modal
      isOpen={activeModal === MODALS.LOGOUT_CONFIRM}
      title="Log Out"
      description="Confirm before ending this session."
      onClose={() => setActiveModal(MODALS.NONE)}
    >
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        You will need to sign in again to access your tracker.
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" onClick={() => setActiveModal(MODALS.NONE)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleLogout} disabled={actionLoading}>
          Log Out
        </Button>
      </div>
    </Modal>
  );
}

export default LogoutConfirmModal;
