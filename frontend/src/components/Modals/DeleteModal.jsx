import useApp from '../../customHook/useApp';
import Button from '../Utils/Button';
import { Modal } from '../Utils/Modal';

function DeleteModal() {
  const {
    activeModal,
    setActiveModal,
    MODALS,
    problemToDelete,
    handleConfirmDelete,
    handleConfirmDeleteAll,
    actionLoading
  } = useApp();

  return (
    <>
      <Modal
        isOpen={activeModal === MODALS.DELETE_SINGLE}
        title="Delete Problem"
        description="This cannot be undone."
        onClose={() => setActiveModal(MODALS.NONE)}
      >
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Delete <span className="font-semibold text-neutral-950 dark:text-neutral-50">{problemToDelete?.title}</span>?
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setActiveModal(MODALS.NONE)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete} disabled={actionLoading}>
            {actionLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === MODALS.DELETE_ALL}
        title="Delete All Problems"
        description="Only your problems will be deleted."
        onClose={() => setActiveModal(MODALS.NONE)}
      >
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          This removes every problem in your account. The action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setActiveModal(MODALS.NONE)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDeleteAll} disabled={actionLoading}>
            {actionLoading ? 'Deleting...' : 'Delete All'}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default DeleteModal;
