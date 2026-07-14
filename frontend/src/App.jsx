import Header from './components/Header/Header.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import MainContent from './components/MainContent/MainContent.jsx'
import useApp from './customHook/useApp.js'
import useKeyboardShortcut from './customHook/useKeyboardShortcut.js'
import AuthPage from './components/Auth/AuthPage.jsx'
import ToastViewport from './components/Utils/Toast.jsx'

export default function App() {
  const { bgClass, textClass, user, authLoading } = useApp();

  useKeyboardShortcut();

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
        <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Loading CodeTrackr...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <AuthPage />
        <ToastViewport />
      </>
    );
  }

  return (
    <div className={`${bgClass} ${textClass} h-screen overflow-hidden font-sans transition-colors duration-300`}>
      
      <Header />
      
      <div>
        <Sidebar />
        <MainContent />
      </div>

      <ToastViewport />

    </div>
  )
}
