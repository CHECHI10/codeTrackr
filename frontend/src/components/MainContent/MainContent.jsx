import ProblemTable from './ProblemTable.jsx';
import Actionbar from './Actionbar.jsx';
import AllModals from '../Modals/AllModals.jsx';
import useApp from '../../customHook/useApp.js';
import Pagination from '../Pagination/Pagination';

function MainContent() {
  const { sidebarOpen } = useApp();

  return (
    <>
      <AllModals />

      <main className={`flex-1 p-4 transition-all duration-300 lg:p-6 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <div className="mx-auto max-w-7xl space-y-6">
          <Actionbar />
          <ProblemTable />
          <Pagination />
        </div>
      </main>
    </>
  );
}

export default MainContent;
