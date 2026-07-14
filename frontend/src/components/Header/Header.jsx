import useApp from '../../customHook/useApp.js';
import Button from '../Utils/Button.jsx';
import {
  HamburgerIcon,
  LogOutIcon,
  MoonIcon,
  SearchIcon,
  SunIcon
} from '../Utils/Icons.jsx';

function Header() {
  const {
    isDark,
    toggleTheme,
    sidebarOpen,
    setSidebarOpen,
    currentRoute,
    searchTerm,
    setSearchTerm,
    confirmLogout
  } = useApp();

  const routeLabel = {
    '/dashboard': 'Dashboard',
    '/problems': 'Problems',
    '/analytics': 'Analytics'
  }[currentRoute] || 'Dashboard';

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <HamburgerIcon />
          </Button>
          <div className="border-l border-neutral-200 pl-3 text-sm font-medium text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            {routeLabel}
          </div>
        </div>

        <div className="relative hidden w-full max-w-xl md:block">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search problems, topics, notes..."
            className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50 dark:focus:border-neutral-600 dark:focus:bg-neutral-950 dark:focus:ring-neutral-800"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <SunIcon /> : <MoonIcon />}
          </Button>

          <Button variant="ghost" size="icon" onClick={confirmLogout} aria-label="Logout">
            <LogOutIcon />
          </Button>
        </div>
      </div>

      <div className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-800 md:hidden">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search problems..."
            className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-600 dark:focus:ring-neutral-800"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
