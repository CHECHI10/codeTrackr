import AllModals from '../Modals/AllModals.jsx';
import useApp from '../../customHook/useApp.js';
import AnalyticsView from '../Views/AnalyticsView.jsx';
import DashboardView from '../Views/DashboardView.jsx';
import ProblemsView from '../Views/ProblemsView.jsx';

function MainContent() {
  const { currentRoute } = useApp();

  const renderView = () => {
    if (currentRoute === '/problems') return <ProblemsView />;
    if (currentRoute === '/analytics') return <AnalyticsView />;
    return <DashboardView />;
  };

  return (
    <>
      <AllModals />

      <main className="fixed bottom-0 left-0 right-0 top-32 overflow-y-auto p-4 transition-all duration-300 md:top-16 lg:p-6">
        <div className="mx-auto max-w-7xl">
          {renderView()}
        </div>
      </main>
    </>
  );
}

export default MainContent;
