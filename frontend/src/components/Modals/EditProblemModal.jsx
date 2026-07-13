import useApp from '../../customHook/useApp';
import ProblemForm from '../Forms/ProblemForm';
import Button from '../Utils/Button';
import { Modal } from '../Utils/Modal';

function EditProblemModal() {
  const {
    activeModal,
    setActiveModal,
    MODALS,
    formData,
    setFormData,
    handleConfirmEdit,
    actionLoading,
    resetForm
  } = useApp();

  const closeModal = () => {
    resetForm();
    setActiveModal(MODALS.NONE);
  };

  return (
    <Modal
      isOpen={activeModal === MODALS.EDIT_PROBLEM}
      title="Edit Problem"
      description="Update metadata, status, notes, or complexity."
      onClose={closeModal}
      size="lg"
    >
      <div className="space-y-5">
        <ProblemForm formData={formData} setFormData={setFormData} />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          <Button onClick={handleConfirmEdit} disabled={actionLoading}>
            {actionLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditProblemModal;
