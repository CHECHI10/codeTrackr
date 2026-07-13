import useApp from '../../customHook/useApp';
import ProblemForm from '../Forms/ProblemForm';
import Button from '../Utils/Button';
import { Modal } from '../Utils/Modal';

function AddProbModal() {
  const {
    activeModal,
    setActiveModal,
    MODALS,
    formData,
    setFormData,
    handleAddProblem,
    actionLoading,
    resetForm
  } = useApp();

  const closeModal = () => {
    resetForm();
    setActiveModal(MODALS.NONE);
  };

  return (
    <Modal
      isOpen={activeModal === MODALS.ADD_PROBLEM}
      title="Add Problem"
      description="Store the details you want available during revision."
      onClose={closeModal}
      size="lg"
    >
      <div className="space-y-5">
        <ProblemForm formData={formData} setFormData={setFormData} />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleAddProblem} disabled={actionLoading}>
            {actionLoading ? 'Adding...' : 'Add Problem'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddProbModal;
