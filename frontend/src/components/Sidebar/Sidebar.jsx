import useApp from '../../customHook/useApp';
import Button from '../Utils/Button';
import { BarChartIcon, BookIcon, HomeIcon, PanelIcon } from '../Utils/Icons';

function Sidebar() {
  const { sidebarOpen, setActiveModal, MODALS } = useApp();

  const items = [
    { label: 'Dashboard', icon: HomeIcon, active: true },
    { label: 'Problems', icon: BookIcon, active: false },
    { label: 'Analytics', icon: BarChartIcon, active: false }
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-30 h-screen border-r border-neutral-200 bg-white transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950 ${
        sidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'
      } overflow-hidden`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-neutral-200 px-5 dark:border-neutral-800">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-950 text-sm font-bold text-white dark:bg-white dark:text-neutral-950">
            CT
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
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white'
                }`}
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
            onClick={() => setActiveModal(MODALS.HELP)}
          >
            <PanelIcon className="h-4 w-4" />
            Keyboard shortcuts
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
