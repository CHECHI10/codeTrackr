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
    user,
    searchTerm,
    setSearchTerm,
    handleLogout
  } = useApp();

  const initial = user?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
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
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-950 text-xs font-bold text-white dark:bg-white dark:text-neutral-950">
              CT
            </div>
            <span className="font-semibold tracking-tight">CodeTrackr</span>
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

          <div className="hidden items-center gap-3 rounded-md border border-neutral-200 px-2 py-1.5 dark:border-neutral-800 sm:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-xs font-semibold text-white dark:bg-white dark:text-neutral-950">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-4">{user?.username}</p>
              <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">{user?.email}</p>
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
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
