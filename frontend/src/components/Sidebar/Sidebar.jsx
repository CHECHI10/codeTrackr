import useApp from '../../customHook/useApp';
import Button from '../Utils/Button';
import { BarChartIcon, BookIcon, HomeIcon, SettingsIcon } from '../Utils/Icons';

function Sidebar() {
  const { sidebarOpen, setSidebarOpen, setActiveModal, MODALS, navigate, isActiveRoute } = useApp();

  const items = [
    { label: 'Dashboard', icon: HomeIcon, route: '/dashboard' },
    { label: 'Problems', icon: BookIcon, route: '/problems' },
    { label: 'Analytics', icon: BarChartIcon, route: '/analytics' }
  ];

  return (
    <>
      <div
        className="fixed left-0 top-0 z-40 h-screen w-3"
        onMouseEnter={() => setSidebarOpen(true)}
        aria-hidden="true"
      />
      <aside
        onMouseLeave={() => setSidebarOpen(false)}
        className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-neutral-200 bg-white shadow-2xl transition-transform duration-200 dark:border-neutral-800 dark:bg-neutral-950 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-hidden`}
      >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-neutral-200 px-5 dark:border-neutral-800">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-neutral-200 bg-neutral-950 shadow-sm dark:border-neutral-800">
            <img src="/codeTrackr_Logo.png" alt="CodeTrackr" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">CodeTrackr</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">DSA dashboard</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {items.map((item) => {
            const ItemIcon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.route)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActiveRoute(item.route)
                    ? 'bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white'
                }`}
                aria-current={isActiveRoute(item.route) ? 'page' : undefined}
              >
                <ItemIcon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveModal(MODALS.SETTINGS)}
          >
            <SettingsIcon className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      </aside>
    </>
  );
}

export default Sidebar;
