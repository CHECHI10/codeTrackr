import { Modal } from '../Utils/Modal';
import { StatusIcon } from '../Utils/Icons';
import useApp from '../../customHook/useApp';

function UpdateStatusModal() {
  const {
    activeModal,
    setActiveModal,
    MODALS,
    updateStatusProblem,
    handleUpdateStatus,
    actionLoading
  } = useApp();

  return (
    <Modal
      isOpen={activeModal === MODALS.UPDATE_STATUS}
      title="Update Status"
      description={updateStatusProblem?.title}
      onClose={() => setActiveModal(MODALS.NONE)}
    >
      <div className="space-y-2">
        {['solved', 'attempted', 'unsolved'].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => handleUpdateStatus(status)}
            disabled={actionLoading}
            className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-sm font-medium capitalize transition-colors disabled:opacity-50 ${
              updateStatusProblem?.status === status
                ? 'border-neutral-950 bg-neutral-100 text-neutral-950 dark:border-white dark:bg-neutral-800 dark:text-white'
                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800'
            }`}
          >
            <StatusIcon status={status} />
            {status}
          </button>
        ))}
      </div>
    </Modal>
  );
}

export default UpdateStatusModal;
