import AddProbModal from "./AddProbModal"
import RandomProbModal from "./RandomProbModal"
import ShortcutModal from "./ShortcutModal"
import DeleteModal from "./DeleteModal"
import UpdateStatusModal from "./UpdateStatusModal"
import EditProblemModal from "./EditProblemModal"
import LogoutConfirmModal from "./LogoutConfirmModal"
import SettingsModal from "./SettingsModal"

function AllModals() {
  
  return (
    <>
      <AddProbModal />

      <RandomProbModal />

      <ShortcutModal />
      
      <DeleteModal />

      <UpdateStatusModal />

      <EditProblemModal />

      <SettingsModal />

      <LogoutConfirmModal />
    </>
  )
}

export default AllModals
